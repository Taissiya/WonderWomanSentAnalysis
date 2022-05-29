const submitReview = (e) => {
  e.preventDefault();
  const review = document.getElementById('review').value;
  const options = {
    method: 'POST',
    body: JSON.stringify({ review }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  }

  const emojiSection = document.getElementById('emojiSection');
  const title = document.getElementById('title');
  const outline = document.querySelector(':focus');

  fetch('/api/nlp/s-analyzer', options)
    .then(res => res.json())
    .then (({ analysis }) => {
      if (analysis < 0) {
        emojiSection.innerHTML = '<p style="color:red">this massage can be unpleasant</p>';
        title.style.color = 'red';
        outline.style.borderColor = 'red';
      };
      if (analysis === 0) {
        title.style.color = 'grey';
        outline.style.borderColor = 'gray';
      }
      if (analysis > 0) {
        title.style.color = 'green';
        outline.style.borderColor = 'green'
      }
    })
    .catch(err => {
      emojiSection.innerHTML = 'There was an error processing your request!'
    })
}

document.getElementById('review').addEventListener('keyup', submitReview);
document.getElementById('reviewForm').addEventListener('submit', submitReview);
