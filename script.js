async function fetchQuote() {
  const url = "https://stoic-quotes.com/api/quote";
  const response = await fetch(url);
  const text = await response.json();
  document.getElementById("quote-text").innerHTML = text.text;
  document.getElementById("quote-author").innerHTML = "— " + text.author;
}

function render() {
  chrome.storage.sync.get({ birthday: "" }, (items) => {
    const birth = new Date(items.birthday);
    const death = new Date(birth);
    death.setFullYear(birth.getFullYear() + 70);

    let now = new Date().getTime();
    let timeLeft = death - now;
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    let percentageLeft = (timeLeft / (death - birth)) * 100;
    document.getElementById("countdown-days").innerHTML = days;
    document.getElementById("countdown-hours").innerHTML = hours;
    document.getElementById("countdown-minutes").innerHTML = minutes;
    document.getElementById("countdown-seconds").innerHTML = seconds;

    document.getElementById("header-progress-value").innerHTML =
      Math.ceil(100 - percentageLeft) + "%";
    document.getElementById("progress-fill").style.width = `${
      100 - percentageLeft
    }%`;
  });
}

render();
fetchQuote();

const tick = setInterval(render, 1000);
