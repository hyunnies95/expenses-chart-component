fetch('../data.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    drawChart(data)
  })
  .catch(err => {
    console.log('Error: ' + err);
  })
  
function drawChart(data) {
  const chart = document.querySelector('.columns')
  let maxAmount = null
  let maxAmountColumn = null
  
  for (let i = 0; i < data.length; i++) {

    if (data[i].amount > maxAmount) {
      maxAmount = data[i].amount
      maxAmountColumn = i
    }

    let column = document.createElement('li')
    column.className = ('column')
    column.insertAdjacentHTML(`afterbegin`,
      `<div class="column__amount"><p>$${data[i].amount}</p></div>
       <div class="column__bar" style="height: ${data[i].amount * 2.85}px;"></div>
       <span class="column__weekday">${data[i].day}</span>`
    )
    chart.appendChild(column)
  }
  
  const columns = document.querySelectorAll('.column__bar')
  const hiddenAmounts = document.querySelectorAll('.column__amount')
  const coloredColumn = columns[maxAmountColumn]
  coloredColumn.style.background = 'hsl(186, 34%, 60%)'

  for (let i = 0; i < data.length; i++) {
    columns[i].addEventListener('mouseover', () => {
      hiddenAmounts[i].style.opacity = '1'
    })
    columns[i].addEventListener('mouseout', () => {
      hiddenAmounts[i].style.opacity = '0'
    })
  }
}

