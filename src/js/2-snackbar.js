import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const delayInput = form.querySelector('input[name="delay"]');
  const delay = parseInt(delayInput.value);

  const stateInput = form.querySelector('input[name="state"]:checked');
  const state = stateInput.value;

  try {
    await createPromise(delay, state);
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: error.message,
      position: "topRight",
    });
  }
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
  .then((delay) => {
    iziToast.success({
      title: " ",
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: "topRight",
    });
  })
  .catch((error) => {
    iziToast.error({
      title: " ",
      message: `❌ Rejected promise in ${delay}ms`,
      position: "topRight",
    });
  });
}