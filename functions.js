function create_alert_for_work_space(text) {
  alert(text)
}

function alert_for_save(type, text) {
  const alert = document.getElementById('alert_for_save')
  if (type == 'success') {
    alert.classList.contains('alert-success') ? '' : alert.classList.replace('alert-danger', 'alert-success')
  } else {
    alert.classList.contains('alert-danger') ? '' : alert.classList.replace('alert-success', 'alert-danger')
  }
  alert.textContent = text
  alert.style.display = 'block'
  setTimeout(() => alert.style.display = 'none', 3000)
}

export {
  create_alert_for_work_space,
  alert_for_save
}