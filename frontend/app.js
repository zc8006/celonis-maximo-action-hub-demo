let workOrders = [];
let activeFilter = 'all';

async function loadData() {
  const res = await fetch('/api/work-orders');
  const text = await res.text();
  workOrders = parseCsv(text);
  render();
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = splitCsvLine(lines.shift());
  return lines.map(line => {
    const values = splitCsvLine(line);
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i] || '');
    return obj;
  });
}

function splitCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function isOpen(wo) {
  return ['Open', 'In Progress', 'Waiting', 'Reopened'].includes(wo.status);
}

function isHighPriority(wo) {
  return ['High', 'Critical'].includes(wo.priority);
}

function isOverdue(wo) {
  return wo.sla_status === 'Breached';
}

function isWaitingForParts(wo) {
  return wo.waiting_reason === 'Waiting for parts';
}

function filteredOrders() {
  switch (activeFilter) {
    case 'overdue': return workOrders.filter(isOverdue);
    case 'highPriority': return workOrders.filter(isHighPriority);
    case 'waitingParts': return workOrders.filter(isWaitingForParts);
    case 'notEscalated': return workOrders.filter(wo => wo.escalation_status !== 'Escalated');
    default: return workOrders;
  }
}

function render() {
  renderKpis();
  renderTable();
}

function renderKpis() {
  const kpis = [
    { name: 'Open Work Orders', value: workOrders.filter(isOpen).length, hint: 'Active work requiring attention' },
    { name: 'Overdue Work Orders', value: workOrders.filter(isOverdue).length, hint: 'Potential SLA breach cases' },
    { name: 'High Priority Overdue', value: workOrders.filter(wo => isOverdue(wo) && isHighPriority(wo)).length, hint: 'Escalation candidates' },
    { name: 'Escalated Work Orders', value: workOrders.filter(wo => wo.escalation_status === 'Escalated').length, hint: 'Actions already triggered' }
  ];

  document.getElementById('kpis').innerHTML = kpis.map(kpi => `
    <div class="kpi">
      <div class="name">${kpi.name}</div>
      <div class="value">${kpi.value}</div>
      <div class="hint">${kpi.hint}</div>
    </div>
  `).join('');
}

function renderTable() {
  const rows = filteredOrders();
  const body = document.getElementById('work-order-body');
  body.innerHTML = rows.map(wo => `
    <tr>
      <td><strong>${wo.work_order_id}</strong></td>
      <td>${wo.asset_name}<br><span class="muted">${wo.asset_id}</span></td>
      <td>${wo.location}</td>
      <td>${priorityBadge(wo.priority)}</td>
      <td>${statusBadge(wo.status)}</td>
      <td>${wo.due_date}</td>
      <td>${slaBadge(wo.sla_status)}</td>
      <td>${wo.waiting_reason}</td>
      <td>${escalationBadge(wo.escalation_status)}</td>
      <td><button class="action" ${wo.escalation_status === 'Escalated' ? 'disabled' : ''} onclick="escalate('${wo.work_order_id}')">Escalate</button></td>
    </tr>
  `).join('');
}

function priorityBadge(value) {
  const cls = value === 'Critical' ? 'red' : value === 'High' ? 'orange' : 'blue';
  return `<span class="badge ${cls}">${value}</span>`;
}

function statusBadge(value) {
  const cls = value === 'Completed' ? 'green' : value === 'Reopened' ? 'orange' : 'blue';
  return `<span class="badge ${cls}">${value}</span>`;
}

function slaBadge(value) {
  const cls = value === 'Breached' ? 'red' : 'green';
  return `<span class="badge ${cls}">${value}</span>`;
}

function escalationBadge(value) {
  const cls = value === 'Escalated' ? 'green' : 'orange';
  return `<span class="badge ${cls}">${value}</span>`;
}

async function escalate(workOrderId) {
  const wo = workOrders.find(item => item.work_order_id === workOrderId);
  if (!wo) return;

  const payload = {
    workOrderId: wo.work_order_id,
    priority: wo.priority,
    assetId: wo.asset_id,
    dueDate: wo.due_date
  };

  writeLog(`Sending escalation request...\n${JSON.stringify(payload, null, 2)}`);

  try {
    const res = await fetch('/api/escalate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      wo.escalation_status = 'Escalated';
      writeLog(`Escalation completed successfully.\n${JSON.stringify(result, null, 2)}`);
      render();
    } else {
      writeLog(`Escalation failed.\n${JSON.stringify(result, null, 2)}`);
    }
  } catch (err) {
    writeLog(`Escalation failed with network error: ${err.message}`);
  }
}

function writeLog(text) {
  document.getElementById('execution-log').textContent = text;
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderTable();
  });
});

loadData();
