import {
  create_alert_for_work_space,
  alert_for_save
} from './functions.js'


const circle_diagram = document.getElementById('circle_diagram'),
  table_diagram = document.getElementById('table_diagram'),
  chart_diagram = document.getElementById('chart_diagram')
// circle_chart variables
const circle_tbody = document.getElementById('circle_tbody'),
  circle_add_row_btn = document.getElementById('circle_add_row_btn'),
  canvas_circle = document.getElementById('canvas_circle'),
  circle_div_to_hide_content = document.querySelector('.circle_div_to_hide_content')
let circle_row_counter = 1
// Line_chart variable
const canvas_line = document.getElementById('canvas_line'),
  line_div_to_hide_content = document.querySelector('.line_div_to_hide_content'),
  line_tbody = document.getElementById('line_tbody'),
  x_axis = document.getElementById('x_axis'),
  y_axis = document.getElementById('y_axis'),
  dot_color = document.getElementById('dot_color'),
  line_color = document.getElementById('line_color'),
  dashed_line = document.getElementById('dashed_line'),
  create_chart_button = document.getElementById('create_chart_button'),
  name_of_chart = document.getElementById('name_of_chart')
let line_chart;
// Table variable
const table_div_to_hide_content = document.querySelector('.table_div_to_hide_content'),
  table_add_column_buttons = document.querySelectorAll('.table_add_column'),
  table_delete_column_buttons = document.querySelectorAll('.table_delete_column'),
  table_td_colspan = document.getElementById('table_td_colspan'),
  table_create_row = document.querySelector('.table_create_row'),
  table_delete_row = document.querySelector('.table_delete_row'),
  table_select_text_align = document.getElementById('table_select_text_align'),
  table_select_text_color = document.getElementById('table_select_text_color')
let quantity_row = 3,
  quantity_column = 4
// merging cells variables
let first_input;
// // save varialbe
// const save_title = document.getElementById('save_title'),
//   description_title = document.getElementById('description_title'),
//   save_done = document.getElementById('save_done'),
//   dl = document.getElementById('dl')

// Click listeners in order to add animation for diagrams and change the work space
circle_diagram.addEventListener('click', () => {
  circle_diagram.classList.add('circle_animation')
  setTimeout(() => {
    circle_diagram.classList.remove('circle_animation')
  }, 1000)
  // if table has text-success class then remove it 
  table_diagram.classList.contains('text-success') ? table_diagram.classList.remove('text-success') : ''
  // remove previous diagrams and show the circle one
  line_div_to_hide_content.classList.add('turn_animation')
  table_div_to_hide_content.classList.add('turn_animation')
  circle_div_to_hide_content.classList.remove('turn_animation')
  setTimeout(() => line_div_to_hide_content.style.display = 'none', 1000)
  setTimeout(() => table_div_to_hide_content.style.display = 'none', 1000)
  setTimeout(() => {
    circle_div_to_hide_content.style.display = 'block'
    // hide text modifications buttons
    table_select_text_align.style.display = 'none'
    table_select_text_color.style.display = 'none'
  }, 1000)
})

chart_diagram.addEventListener('click', () => {
  // if table chart has text-success class then remove it 
  table_diagram.classList.contains('text-success') ? table_diagram.classList.remove('text-success') : ''
  // animation for chart diagramm
  chart_diagram.classList.add('text-primary')
  setTimeout(() => {
    chart_diagram.classList.remove('text-primary')
  }, 200)
  setTimeout(() => {
    chart_diagram.classList.add('text-warning')
  }, 200)
  setTimeout(() => {
    chart_diagram.classList.remove('text-warning')
  }, 400)
  setTimeout(() => {
    chart_diagram.classList.add('text-success')
  }, 400)
  setTimeout(() => {
    chart_diagram.classList.remove('text-success')
  }, 600)
  // remove previous diagrams and show the chart one
  circle_div_to_hide_content.classList.add('turn_animation')
  table_div_to_hide_content.classList.add('turn_animation')
  line_div_to_hide_content.classList.remove('turn_animation')
  setTimeout(() => circle_div_to_hide_content.style.display = 'none', 1000)
  setTimeout(() => table_div_to_hide_content.style.display = 'none', 1000)
  setTimeout(() => {
    line_div_to_hide_content.style.display = 'block'
    // hide text modifications buttons
    table_select_text_align.style.display = 'none'
    table_select_text_color.style.display = 'none'
  }, 1000)
})


// WFL FOR CIRCLE WORK SPACE
// assign display: block to circle_div_to_hide_content so it can be saved 
circle_div_to_hide_content.style.display = 'block'
// create an empty canvas so it can be updated later on
const data = {
  labels: ['Name 1', 'Name 2', 'Name 3'],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
const config = {
  type: 'pie',
  data: data,
  options: {
    maintainAspectRatio: false
  }
};
let circle_chart = new Chart(canvas_circle, config)



// add row after clicking btn
circle_add_row_btn.addEventListener('click', () => {
  const html_content = `
  <td scope="row">
  <input type="text" class="form-control" id="circle_name_${circle_row_counter}">
  </td>
  <td scope="row">
  <input type="color" class="form-control-color" id="circle_color_${circle_row_counter}">
  </td>
  <td scope="row">
  <input type="number" class="form-control" id="circle_value_${circle_row_counter}">
  </td>
  <td scope="row">
  <button type="button" class="btn btn-success circle_add_row">Add</button>
  </td>
  `
  const tr = document.createElement('tr')
  tr.setAttribute('id', `circle_row_${circle_row_counter}`)
  tr.innerHTML = html_content
  circle_tbody.appendChild(tr)
  // increase counter
  circle_row_counter++
  // add listener for the button so data can be added to the canvas or the row removed
  const current_btn = tr.querySelector('.btn')
  current_btn.addEventListener('click', () => {
    add_or_remove_row(current_btn)
  })
})

// add row to the canvas or remove the row
const all_circle_add_button = document.querySelectorAll('.circle_add_row')
all_circle_add_button.forEach(btn => btn.addEventListener('click', () => {
  add_or_remove_row(btn)
}))

function add_or_remove_row(btn) {
  if (btn.classList.contains('btn-success')) {
    // getting required elements
    const id_of_row = btn.parentElement.parentElement.getAttribute('id').slice(-1)
    const circle_name = document.getElementById(`circle_name_${id_of_row}`)
    const circle_value = document.getElementById(`circle_value_${id_of_row}`)
    const circle_color = document.getElementById(`circle_color_${id_of_row}`)
    // check if name or value field are empty
    if (circle_name.value == '' && circle_value.value == '') {
      create_alert_for_work_space('Name and value fields must be filled')
    } else if (circle_name.value == '') {
      create_alert_for_work_space('Name field must be filled')
    } else if (circle_value.value == '') {
      create_alert_for_work_space('Value field must be filled')
    } else {
      // technical functionality for adding row's data to the canvas
      // check if the data are added at the first time (in order to clean default values)
      if (!sessionStorage.getItem('not_added_data_to_cicle')) {
        circle_chart.data.labels = []
        circle_chart.data.datasets[0].data = []
        circle_chart.data.datasets[0].backgroundColor = []
      }

      // check if the name is duplicated and if it is then throw an alert and return
      for (let index in circle_chart.data.labels) {
        if (circle_chart.data.labels[index] == circle_name.value) {
          create_alert_for_work_space('Duplicate names are not allowed')
          return
        }
      }

      // push data to the canvas
      circle_chart.data.labels.push(circle_name.value)
      circle_chart.data.datasets[0].data.push(circle_value.value)
      circle_chart.data.datasets[0].backgroundColor.push(circle_color.value)
      circle_chart.update()
      // disabled input field so later on they can be found in the dataset array
      circle_name.disabled = true
      circle_value.disabled = true
      circle_color.disabled = true

      // change the button class and text content
      const last_td_elem = document.getElementById(`circle_row_${id_of_row}`).lastElementChild
      last_td_elem.classList.add('d-flex', 'justify-content-between')

      const update_btn = document.createElement('button')
      update_btn.classList.add('btn', 'circle_update_row', 'btn-info')
      update_btn.textContent = 'Update'
      const delete_btn = document.createElement('button')
      delete_btn.classList.add('btn', 'circle_remove_row', 'btn-danger')
      delete_btn.textContent = 'Remove'
      // delete add button
      last_td_elem.querySelector('.btn-success').remove()
      // append new button
      last_td_elem.appendChild(update_btn)
      last_td_elem.appendChild(delete_btn)
      // create a variable in the local storage that the user added some data
      sessionStorage.setItem('not_added_data_to_cicle', true)

      // remove row after the delete_btn is clicked
      delete_btn.addEventListener('click', () => {
        // delete data from the canvas
        const index_of_label = circle_chart.data.labels.indexOf(circle_name.value)
        circle_chart.data.labels.splice(index_of_label, 1)
        circle_chart.data.datasets[0].data.splice(index_of_label, 1)
        circle_chart.data.datasets[0].backgroundColor.splice(index_of_label, 1)
        circle_chart.update()
        // delete the row from HTML
        delete_btn.parentElement.parentElement.remove()
      })

      // update row information
      update_btn.addEventListener('click', () => {
        // enable input fields
        circle_name.disabled = false
        circle_value.disabled = false
        circle_color.disabled = false
        // remove previous buttons and create a save button
        last_td_elem.removeChild(update_btn)
        last_td_elem.removeChild(delete_btn)
        const save_btn = document.createElement('button')
        save_btn.classList.add('btn', 'btn-info', 'circle_update_row')
        save_btn.textContent = 'Save'
        last_td_elem.appendChild(save_btn)
        // remove d-flex class so the save button is centered
        last_td_elem.classList.remove('d-flex')

        // get index of the current values
        const index_of_label = circle_chart.data.labels.indexOf(circle_name.value)
        // add event listner so that after click data is updated
        save_btn.addEventListener('click', () => {
          // add d-flex class so the buttons are centered
          last_td_elem.classList.add('d-flex')
          // disable fields again
          circle_name.disabled = true
          circle_value.disabled = true
          circle_color.disabled = true
          // update info in the canvas
          circle_chart.data.labels[index_of_label] = circle_name.value
          circle_chart.data.datasets[0].data[index_of_label] = circle_value.value
          circle_chart.data.datasets[0].backgroundColor[index_of_label] = circle_color.value
          circle_chart.update()
          // remove save button and add update/delete button
          last_td_elem.appendChild(update_btn)
          last_td_elem.appendChild(delete_btn)
          last_td_elem.removeChild(save_btn)
        })
      })
    }
  }
}


// WFL FOR CHART DIAGRAMM WORK SPACE
// create dummy line chart
const data_line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'red',
    backgroundColor: 'green',
    borderDash: [40, 10],
    tension: 0.1
  }]
};
const config_line = {
  type: 'line',
  data: data_line,
};
line_chart = new Chart(canvas_line, config_line)

// listen for dashline changes
dashed_line.addEventListener('change', function () {
  if (this.value == 'yes') {
    // create inner html to get values for the dashed line
    const innerHTML_for_tr1 = `
      <td>Length of a line</td>
      <td class="text-center"><input type="number" class="form-control" id="dashed_line_length"></td>
    `
    const innerHTML_for_tr2 = `
    <td>Space between lines</td>
    <td class="text-center"><input type="number" class="form-control" id="dashed_line_space"></td>
    `
    const child_to_append_1 = document.createElement('tr')
    const child_to_append_2 = document.createElement('tr')
    child_to_append_1.innerHTML = innerHTML_for_tr1
    child_to_append_2.innerHTML = innerHTML_for_tr2
    line_tbody.appendChild(child_to_append_1)
    line_tbody.appendChild(child_to_append_2)
  } else {
    line_tbody.lastChild.remove()
    line_tbody.lastChild.remove()
  }
})

// create the chart
// check if all the data were typed and correctly; if yes create the chart
create_chart_button.addEventListener('click', () => {
  const reg_comma_separated_input = /^\s*[^,\x20\n]+(?:(\s*,\s*[^\x20\n,]+)|$)+$/
  const reg_comma_separeted_numbers = /^\s*\d+(?:(\s*,\s*\d+)|$)+$/
  if (!reg_comma_separated_input.test(x_axis.value)) {
    create_alert_for_work_space('X axis field is written incorrectly')
  } else if (!reg_comma_separeted_numbers.test(y_axis.value)) {
    create_alert_for_work_space('Y axis field is written incorrectly')
  } else if (name_of_chart.value == '') {
    create_alert_for_work_space('The name of the chart must be filled')
  } else {
    // all data must be already correcly, let's check if the dashed line will be used
    if (dashed_line.value == 'yes') {
      const dashed_line_length = document.getElementById('dashed_line_length')
      const dashed_line_space = document.getElementById('dashed_line_space')
      // check if the user forget to add data
      if (dashed_line_length.value == '') {
        create_alert_for_work_space('"Length of a line" field must be filled')
        return
      }
      if (dashed_line_space.value == '') {
        create_alert_for_work_space('"Space between lines" field must be filled')
        return
      }
      // set values in the line chart
      line_chart.data.datasets[0].borderDash[0] = +dashed_line_length.value
      line_chart.data.datasets[0].borderDash[1] = +dashed_line_space.value
    } else {
      // remove dashed line 
      line_chart.data.datasets[0].borderDash = []
    }
    // insert other data to the line_chart
    // remove spaces from input field
    const array_xaxis_without_spaces = x_axis.value.split(',').map((val) => val.trim())
    const array_yaxis_without_spaces = y_axis.value.split(',').map((val) => val.trim())
    // push data to the line_chart
    line_chart.data.labels = array_xaxis_without_spaces
    line_chart.data.datasets[0].data = array_yaxis_without_spaces
    line_chart.data.datasets[0].label = name_of_chart.value
    line_chart.data.datasets[0].borderColor = line_color.value
    line_chart.data.datasets[0].backgroundColor = dot_color.value
    line_chart.update()
  }
})


// WFL FOR TABLE WORK SPACE
table_diagram.addEventListener('click', () => {
  // remove previous diagrams and show the chart one
  table_diagram.classList.add('text-success')
  table_div_to_hide_content.classList.remove('turn_animation')
  circle_div_to_hide_content.classList.add('turn_animation')
  line_div_to_hide_content.classList.add('turn_animation')
  setTimeout(() => circle_div_to_hide_content.style.display = 'none', 1000)
  setTimeout(() => line_div_to_hide_content.style.display = 'none', 1000)
  setTimeout(() => {
    table_div_to_hide_content.style.display = 'block'
    // show text modifications buttons
    table_select_text_align.style.display = 'block'
    table_select_text_color.style.display = 'block'
  }, 1000)
})

// create new column
table_add_column_buttons.forEach(btn => btn.addEventListener('click', () => {
  create_column()
}))

function create_column() {
  // increment counter
  quantity_column++
  // change colspan of the create row button
  table_td_colspan.setAttribute('colspan', quantity_column)
  // for header column
  const head_row = document.getElementById('row_1')
  const head_row_last_child = head_row.lastElementChild
  const th = document.createElement('th')
  th.innerHTML = `
  <input type="text" class="form-control text-danger text-start" placeholder="Type a header"
  id="1_${quantity_column}">
  `
  // append child
  head_row.insertBefore(th, head_row_last_child)

  // for tbody
  const all_tr_that_have_id = [...document.querySelectorAll('.table_div_to_hide_content>table>tbody>tr')].filter(el => el.hasAttribute('id'))
  all_tr_that_have_id.forEach(tr => {
    const id_of_tr = tr.getAttribute('id').slice(-1)
    const last_child_of_tr = tr.lastElementChild
    const td = document.createElement('td')
    td.innerHTML = `<input type="text" class="form-control text-warning text-start" id="${id_of_tr}_${quantity_column}">`
    tr.insertBefore(td, last_child_of_tr)
  })
}
// remove a column
table_delete_column_buttons.forEach(btn => btn.addEventListener('click', () => {
  delete_column()
}))

function delete_column() {
  // not allow user to have less than one column 
  if (quantity_column == 1) return
  // remove the last header
  document.getElementById(`1_${quantity_column}`).parentElement.remove()
  // remove tr in the body
  const all_tr_that_have_id = [...document.querySelectorAll('.table_div_to_hide_content>table>tbody>tr')].filter(el => el.hasAttribute('id'))
  all_tr_that_have_id.forEach(el => {
    const id = el.getAttribute('id').slice(-1)
    const input = document.getElementById(`${id}_${quantity_column}`)
    // remove the parent
    input.parentElement.remove()
  })
  // decrease the counter
  quantity_column--
  // change colspan of the create row button
  table_td_colspan.setAttribute('colspan', quantity_column)
}

// create a new row
table_create_row.addEventListener('click', () => {
  create_row()
})

function create_row() {
  // increase counter
  quantity_row++
  // create a new tr
  const tr = document.createElement('tr')
  tr.setAttribute('id', `row_${quantity_row}`)
  // create td according to the quanity of columns
  for (let i = 1; i <= quantity_column; i++) {
    const td = document.createElement('td')
    td.innerHTML = `<input type="text" class="form-control text-warning text-start" id="${quantity_row}_${i}">`
    tr.appendChild(td)
  }
  // add buttons for creating/removing columns
  const td = document.createElement('td')
  td.classList.add('text-center', 'position-relative')
  td.innerHTML = `
  <button class="btn btn-info position-absolute table_add_column" id="table_add_column_${quantity_row}"
  style="width: 50%; height: 100%; top: 0; left: 0; border-radius: 0;">+
</button>
<button class="btn btn-danger position-absolute table_delete_column" id="table_delete_column_${quantity_row}"
  style="width: 50%; height: 100%; top: 0; left: 50%; border-radius: 0;">-
</button>
  `
  tr.appendChild(td)
  // append tr to the tbody
  const tbody = document.querySelector('.table_div_to_hide_content>table>tbody')
  tbody.insertBefore(tr, tbody.lastElementChild)
  // add event listers for removing/adding columns
  document.getElementById(`table_add_column_${quantity_row}`).addEventListener('click', () => {
    create_column()
  })
  document.getElementById(`table_delete_column_${quantity_row}`).addEventListener('click', () => {
    delete_column()
  })
}
// remove a row
table_delete_row.addEventListener('click', () => {
  delete_row()
})

function delete_row() {
  // minimum 1 row must be
  if (quantity_row == 2) return
  document.getElementById(`row_${quantity_row}`).remove()
  quantity_row--
}


// FUNCTIONALITY TO ALLOW SELECT MULTIPLE CELLS
table_div_to_hide_content.addEventListener('mousedown', function (e) {
  // check if a cell was clicked
  if (e.target.tagName == 'INPUT') {
    // remove all the previous marked cells
    const th_thead = document.querySelectorAll('.table_div_to_hide_content>table>thead>tr>th')
    const td_tbody = document.querySelectorAll('.table_div_to_hide_content>table>tbody>tr>td')
    th_thead.forEach(el => {
      el.style.border = '1px solid rgb(13,110,253)'
      el.style.background = 'rgb(33, 37, 41)'
    })
    td_tbody.forEach(el => {
      el.style.background = 'rgb(33, 37, 41)'
      el.style.border = '1px solid rgb(13,110,253)'
    })
    // assign first clicked input and listen for mouse moves
    first_input = e.target
    document.addEventListener('mouseup', function (e) {
      // the user left mouse
      table_div_to_hide_content.removeEventListener('mousemove', mouse_move)
      if (e.target.tagName === 'INPUT' && document.activeElement.tagName === 'INPUT' && e.target.parentElement.style.background == 'white') {
        // enable text modification buttons
        table_select_text_align.classList.add('text-white')
        table_select_text_color.classList.add('text-white')
        table_select_text_align.disabled = false
        table_select_text_color.disabled = false
        // add event listeners for those buttons
        table_select_text_color.addEventListener('change', () => {
          change_text_color()
        })
        table_select_text_align.addEventListener('change', () => {
          change_text_align()
        })
      }
      // allow to write in multiple cells
      first_input.addEventListener('input', function () {
        // find out all cells with white background
        const all_th = document.querySelectorAll('.table_div_to_hide_content > table > thead > tr > th')
        const all_td = document.querySelectorAll('.table_div_to_hide_content > table > tbody > tr > td')
        const th_with_white_background = [...all_th].filter(el => el.style.background == 'white')
        const td_with_white_background = [...all_td].filter(el => el.style.background == 'white')
        // if there are no such elements then return otherwise listen for input
        if (!th_with_white_background && !td_with_white_background) {
          return
          // only headers are selected
        } else if (th_with_white_background.length > 0 && td_with_white_background.length == 0) {
          const array_with_input = []
          th_with_white_background.forEach(el => array_with_input.push(el.firstElementChild))
          array_with_input.forEach(el => el.value = this.value)
          // only body input are selected
        } else if (td_with_white_background.length > 0 && th_with_white_background.length == 0) {
          const array_with_input = []
          td_with_white_background.forEach(el => array_with_input.push(el.firstElementChild))
          array_with_input.forEach(el => el.value = this.value)
          // both are selected
        } else {
          const array_with_input_th = []
          th_with_white_background.forEach(el => array_with_input_th.push(el.firstElementChild))
          array_with_input_th.forEach(el => el.value = this.value)
          const array_with_input_td = []
          td_with_white_background.forEach(el => array_with_input_td.push(el.firstElementChild))
          array_with_input_td.forEach(el => el.value = this.value)
        }
      })
      // in case if the input is no longer in focus then remove background and disable text modification buttons
      first_input.addEventListener('blur', () => {
        document.addEventListener('mousedown', function (e) {
          if (e.target.tagName !== 'SELECT') {
            th_thead.forEach(el => {
              el.style.border = '1px solid rgb(13,110,253)'
              el.style.background = 'rgb(33, 37, 41)'
            })
            td_tbody.forEach(el => {
              el.style.background = 'rgb(33, 37, 41)'
              el.style.border = '1px solid rgb(13,110,253)'
            })
            table_select_text_align.classList.remove('text-white')
            table_select_text_color.classList.remove('text-white')
            table_select_text_align.disabled = true
            table_select_text_color.disabled = true
          }
        })
      })
    })
    table_div_to_hide_content.addEventListener('mousemove', mouse_move)
  }
})

function mouse_move(e) {
  const id_of_first_input = first_input.getAttribute('id')
  // be sure that the mouse is within input 
  if (e.target.tagName == 'INPUT') {
    const id_of_current_input = e.target.getAttribute('id')
    // if the cell is the same then style only it
    if (id_of_current_input == id_of_first_input) {
      first_input.parentElement.style.border = '2px solid red'
      first_input.parentElement.style.background = 'white'
    } else {
      // the cell is different
      const row_of_target_input = +e.target.getAttribute('id').slice(0, 1)
      const column_of_target_input = +e.target.getAttribute('id').slice(-1)
      const row_of_first_input = +first_input.getAttribute('id').slice(0, 1)
      const column_of_first_input = +first_input.getAttribute('id').slice(-1)
      // now decide which cell is located closer to the left side 
      if ((column_of_target_input - column_of_first_input) > 0) {
        // first input is closer to the left side 
        //  find out which row is further 
        if (row_of_target_input - row_of_first_input > 0) {
          // target row is further
          // style rows
          for (let i = row_of_first_input; i <= row_of_target_input; i++) {
            const target_cell = document.getElementById(`${i}_${column_of_first_input}`)
            target_cell.parentElement.style.border = '2px solid red'
            target_cell.parentElement.style.background = 'white'
            // style columns
            for (let ind = column_of_first_input + 1; ind <= column_of_target_input; ind++) {
              const target_cell = document.getElementById(`${i}_${ind}`)
              target_cell.parentElement.style.border = '2px solid red'
              target_cell.parentElement.style.background = 'white'
            }
          }
        } else if ((row_of_target_input - row_of_first_input < 0)) {
          // first row is further
          // style rows
          for (let i = row_of_first_input; i >= row_of_target_input; i--) {
            const target_cell = document.getElementById(`${i}_${column_of_first_input}`)
            target_cell.parentElement.style.border = '2px solid red'
            target_cell.parentElement.style.background = 'white'
            // style columns
            for (let ind = column_of_first_input + 1; ind <= column_of_target_input; ind++) {
              const target_cell = document.getElementById(`${i}_${ind}`)
              target_cell.parentElement.style.border = '2px solid red'
              target_cell.parentElement.style.background = 'white'
            }
          }
        } else if ((row_of_target_input - row_of_first_input == 0)) {
          // the same row
          // style columns
          for (let ind = column_of_first_input + 1; ind <= column_of_target_input; ind++) {
            const target_cell = document.getElementById(`${row_of_first_input}_${ind}`)
            target_cell.parentElement.style.border = '2px solid red'
            target_cell.parentElement.style.background = 'white'
          }
        }
      } else if ((column_of_target_input - column_of_first_input) < 0) {
        // target input is closer to the left side 
        //  find out which row is further 
        if (row_of_target_input - row_of_first_input > 0) {
          // target row is further
          // style rows
          for (let i = row_of_target_input; i >= row_of_first_input; i--) {
            const target_cell = document.getElementById(`${i}_${column_of_target_input}`)
            target_cell.parentElement.style.border = '2px solid red'
            target_cell.parentElement.style.background = 'white'
            // style columns
            for (let ind = column_of_target_input + 1; ind <= column_of_first_input; ind++) {
              const target_cell = document.getElementById(`${i}_${ind}`)
              target_cell.parentElement.style.border = '2px solid red'
              target_cell.parentElement.style.background = 'white'
            }
          }
        } else if ((row_of_target_input - row_of_first_input < 0)) {
          // first row is further
          // style rows
          for (let i = row_of_target_input; i <= row_of_first_input; i++) {
            const target_cell = document.getElementById(`${i}_${column_of_target_input}`)
            target_cell.parentElement.style.border = '2px solid red'
            target_cell.parentElement.style.background = 'white'
            // style columns
            for (let ind = column_of_target_input + 1; ind <= column_of_first_input; ind++) {
              const target_cell = document.getElementById(`${i}_${ind}`)
              target_cell.parentElement.style.border = '2px solid red'
              target_cell.parentElement.style.background = 'white'
            }
          }
        } else if ((row_of_target_input - row_of_first_input == 0)) {
          // the same row
          // style columns
          for (let ind = column_of_first_input - 1; ind >= column_of_target_input; ind--) {
            const target_cell = document.getElementById(`${row_of_first_input}_${ind}`)
            target_cell.parentElement.style.border = '2px solid red'
            target_cell.parentElement.style.background = 'white'
          }
        }
      } else if ((column_of_target_input - column_of_first_input) == 0) {
        // the same columm
        // find out which column is closer to the top
        if (row_of_target_input - row_of_first_input > 0) {
          // first input is closer to the top
          for (let i = row_of_first_input + 1; i <= row_of_target_input; i++) {
            const target_cell = document.getElementById(`${i}_${column_of_target_input}`)
            target_cell.parentElement.style.border = '2px solid red'
            target_cell.parentElement.style.background = 'white'
          }
        } else {
          // target input is closer to the top
          for (let i = row_of_first_input - 1; i >= row_of_target_input; i--) {
            const target_cell = document.getElementById(`${i}_${column_of_target_input}`)
            target_cell.parentElement.style.border = '2px solid red'
            target_cell.parentElement.style.background = 'white'
          }
        }
      }
    }
  }
}
// SUPPLEMENTAL FUNCTION FOR UPDATING TEXT STYLE
function change_text_color() {
  if (table_select_text_color.value == 'no_value') return
  // find out all cells with white background
  const all_th = document.querySelectorAll('.table_div_to_hide_content > table > thead > tr > th')
  const all_td = document.querySelectorAll('.table_div_to_hide_content > table > tbody > tr > td')
  const th_with_white_background = [...all_th].filter(el => el.style.background == 'white')
  const td_with_white_background = [...all_td].filter(el => el.style.background == 'white')
  // filter inputs into separate array
  const array_with_input_th = []
  th_with_white_background.forEach(el => array_with_input_th.push(el.firstElementChild))
  const array_with_input_td = []
  td_with_white_background.forEach(el => array_with_input_td.push(el.firstElementChild))
  // loop throught inputs and change their class
  if (array_with_input_th.length > 0) {
    array_with_input_th.forEach(el => {
      let currentClassWithColor
      el.classList.forEach(list => {
        if (list.includes('text-p') || list.includes('text-se') || list.includes('text-su') || list.includes('text-w') || list.includes('text-i') || list.includes('text-d') || list.includes('text-l')) {
          currentClassWithColor = list
        }
      })
      el.classList.replace(currentClassWithColor, table_select_text_color.value)
    })
  }
  if (array_with_input_td.length > 0) {
    array_with_input_td.forEach(el => {
      let currentClassWithColor
      el.classList.forEach(list => {
        if (list.includes('text-p') || list.includes('text-se') || list.includes('text-su') || list.includes('text-w') || list.includes('text-i') || list.includes('text-d') || list.includes('text-l')) {
          currentClassWithColor = list
        }
      })
      el.classList.replace(currentClassWithColor, table_select_text_color.value)
    })
  }
}

function change_text_align() {
  if (table_select_text_align.value == 'no_value') return
  // find out all cells with white background
  const all_th = document.querySelectorAll('.table_div_to_hide_content > table > thead > tr > th')
  const all_td = document.querySelectorAll('.table_div_to_hide_content > table > tbody > tr > td')
  const th_with_white_background = [...all_th].filter(el => el.style.background == 'white')
  const td_with_white_background = [...all_td].filter(el => el.style.background == 'white')
  // filter inputs into separate array
  const array_with_input_th = []
  th_with_white_background.forEach(el => array_with_input_th.push(el.firstElementChild))
  const array_with_input_td = []
  td_with_white_background.forEach(el => array_with_input_td.push(el.firstElementChild))
  // loop throught inputs and change their class
  if (array_with_input_th.length > 0) {
    array_with_input_th.forEach(el => {
      let currentClassWithAlign
      el.classList.forEach(list => {
        if (list.includes('text-st') || list.includes('text-c') || list.includes('text-e')) {
          currentClassWithAlign = list
        }
      })
      el.classList.replace(currentClassWithAlign, table_select_text_align.value)
    })
  }
  if (array_with_input_td.length > 0) {
    array_with_input_td.forEach(el => {
      let currentClassWithAlign
      el.classList.forEach(list => {
        if (list.includes('text-st') || list.includes('text-c') || list.includes('text-e')) {
          currentClassWithAlign = list
        }
      })
      el.classList.replace(currentClassWithAlign, table_select_text_align.value)
    })
  }
}


// Due to initial implementation to create such functionality would be better create a new app  
// // Saving functionality
// save_done.addEventListener('click', () => {
//   // to prevent xss 
//   const reg_prevent_xss = /^[a-z0-9]*$/i
//   if (!reg_prevent_xss.test(save_title.value) || !reg_prevent_xss.test(description_title.value)) {
//     alert_for_save('danger', 'Use only letters from a to z and numbers')
//   }
//   // if title is missing then throw alert
//   if (save_title.value == '') {
//     alert_for_save('danger', 'Title must be written')
//     return
//   }
//   // only unique titles are allowed, otherwise throw alert
//   if (localStorage.getItem(`${save_title.value}`) || save_title.value == 'list_of_user_reports') {
//     alert_for_save('danger', 'Title must be unique')
//     return
//   } else {
//     // set a variable in local storage that will hold names of reports
//     if (!localStorage.getItem('list_of_user_reports')) {
//       // the variable is not initialized
//       localStorage.setItem('list_of_user_reports', save_title.value)
//     } else {
//       // there are variable with user reports
//       let list = localStorage.getItem('list_of_user_reports')
//       list += ` ${save_title.value}`
//       localStorage.setItem('list_of_user_reports', list)
//     }
//     // detect which workspace is opened right now
//     const current_view = [table_div_to_hide_content, line_div_to_hide_content, circle_div_to_hide_content].filter(el => el.style.display == 'block')
//     localStorage.setItem(save_title.value, current_view[0].innerHTML)
//     description_title.value != '' ? localStorage.setItem(`${save_title.value}_description`, description_title.value) : ''
//     alert_for_save('success', 'The report is saved')
//     // UPDATE HTML FOR SAVED REPORTS
//     let description;
//     localStorage.getItem(`${save_title.value}_description`) ? description = localStorage.getItem(`${save_title.value}_description`) : ''
//     // create div with report data
//     const div_for_dl = document.createElement('div')
//     div_for_dl.classList.add("d-flex", "align-items-center", "justify-content-between")
//     div_for_dl.setAttribute('id', save_title.value)
//     if (description) {
//       div_for_dl.innerHTML = `
//       <div>
//       <dt>${save_title.value}</dt>
//       <dd>${description}</dd>
//   </div>
//   <div>
//       <button type="button" class="btn btn-primary" data-bs-dismiss="modal">View</button>
//       <button type="button" class="btn btn-info">Update</button>
//       <button type="button" class="btn btn-danger">Delete</button>
//   </div>
//       `
//     } else {
//       div_for_dl.innerHTML = `
//       <div>
//       <dt>${save_title.value}</dt>
//       <dd>No description</dd>
//   </div>
//   <div>
//       <button type="button" class="btn btn-primary" data-bs-dismiss="modal">View</button>
//       <button type="button" class="btn btn-info">Update</button>
//       <button type="button" class="btn btn-danger">Delete</button>
//   </div>
//       `
//     }
//     // append to dl
//     dl.appendChild(div_for_dl)
//   }
// })

// // as soon as the page is loaded check local storage and create dl with them
// if (!localStorage.getItem('list_of_user_reports')) {
//   // the variable is not initialized - infrom user that it has no reports
//   const h2 = document.createElement('h2')
//   h2.textContent = 'You have no reports so far'
//   h2.className = 'text-center'
//   dl.appendChild(h2)
// } else {
//   // there are saved reports
//   const array_of_reports = [...localStorage.getItem('list_of_user_reports')].join('').split(' ')
//   array_of_reports.forEach(report => {
//     // check if thre are a description
//     let description;
//     localStorage.getItem(`${report}_description`) ? description = localStorage.getItem(`${report}_description`) : ''
//     // create div with report data
//     const div_for_dl = document.createElement('div')
//     div_for_dl.classList.add("d-flex", "align-items-center", "justify-content-between")
//     div_for_dl.setAttribute('id', report)
//     if (description) {
//       div_for_dl.innerHTML = `
//       <div>
//       <dt>${report}</dt>
//       <dd>${description}</dd>
//   </div>
//   <div>
//       <button type="button" class="btn btn-primary" data-bs-dismiss="modal">View</button>
//       <button type="button" class="btn btn-info">Update</button>
//       <button type="button" class="btn btn-danger">Delete</button>
//   </div>
//       `
//     } else {
//       div_for_dl.innerHTML = `
//       <div>
//       <dt>${report}</dt>
//       <dd>No description</dd>
//   </div>
//   <div>
//       <button type="button" class="btn btn-primary" data-bs-dismiss="modal">View</button>
//       <button type="button" class="btn btn-info">Update</button>
//       <button type="button" class="btn btn-danger">Delete</button>
//   </div>
//       `
//     }
//     // append to dl
//     dl.appendChild(div_for_dl)
//   })
// }

// // view reports
// let all_view_buttons = [...document.querySelectorAll('#dl>div>div:nth-child(2)>button.btn-primary')]
// all_view_buttons.forEach(btn => {
//   btn.addEventListener('click', function () {
//     const id = this.parentElement.parentElement.getAttribute('id')
//     const requiredHTML = localStorage.getItem(id)
//     console.log(requiredHTML);
//     document.querySelector('.dashboard').innerHTML = requiredHTML
//   })
// })