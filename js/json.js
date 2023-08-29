async function main(search = "13", btnShoAll) {
  const fetchIng = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search}`
  );
  const json = await fetchIng.json();
  const data = json.data;
  forCard(data, btnShoAll);
}
main();
const loading = document.querySelector(".loading");
const forCard = (datas, btnShoAll) => {
  const cardContainer = document.querySelector(".product-container");
  cardContainer.textContent = "";
  const btn = document.querySelector(".btn-local");
  if (datas.length > 12 && btnShoAll) {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
  loading.classList.add("hidden");

  if (btnShoAll) {
    datas = datas.slice(0, 12);
  }

  datas.forEach((data) => {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
    <div class="card w-96 mx-auto my-4 bg-gray-200 p-4  ">
    <figure>
      <img
        src="${data.image}"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${data.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary"  onclick="modalDetails('${data.slug}');">Buy Now</button>
      </div>
    </div>
  </div>
    `;
    cardContainer.appendChild(createDiv);
  });
};

async function modalDetails(data) {
  const fetchData = await fetch(
    `https://openapi.programming-hero.com/api/phone/${data}`
  );
  const json = await fetchData.json();
  const jsonData = json.data;
  console.log(jsonData);
  const modal = document.querySelector("#my_modal_5");

  modal.innerHTML = `
  <form method="dialog" class="modal-box">
              <h3 class="font-bold text-lg">${jsonData.brand}</h3>
              <img src="${jsonData.image}" alt="" />
              <p class="py-4">
                Press ESC key or click the button below to close
              </p>
              <div class="modal-action">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </div>
            </form>
  `;
  my_modal_5.showModal();
}

const onclick = (btnShoAll) => {
  const inputValue = document.querySelector(".inputValue");
  const mainValue = inputValue.value;
  main(mainValue, btnShoAll);

  loading.classList.remove("hidden");
};
const button = document.querySelector(".button");
button.addEventListener("click", onclick);
function buttonShowAll() {
  onclick(false);
}
main();
