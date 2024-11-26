document.addEventListener("DOMContentLoaded", () => {
    const orderForm = document.querySelector(".order");
    const orderResult = document.querySelector(".order-result");
    const submitButton = orderForm.querySelector("button[type='submit']");

    // Изменение цвета кнопки при наведении
    submitButton.addEventListener("mouseover", () => {
        submitButton.style.backgroundColor = "#0e460f";
        submitButton.style.color = "#fff";
    });

    submitButton.addEventListener("mouseout", () => {
        submitButton.style.backgroundColor = "#4caf50";
        submitButton.style.color = "#fff";
    });

    // Скрытие блока с результатами при нажатии
    orderResult.addEventListener("click", () => {
        orderResult.style.display = "none";
    });

    // Слушатель отправки формы
    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const errors = [];

        const productName = orderForm.querySelector("input[name='product_name']").value.trim();
        const quantity = orderForm.querySelector("input[name='quantity']").value.trim();
        const deliveryDate = orderForm.querySelector("input[name='delivery_date']").value;
        const deliveryMethod = orderForm.querySelector("select[name='delivery_method']").value;
        const comments = orderForm.querySelector("textarea[name='comments']").value.trim();

        // Проверка названия продукта/услуги
        const productNameRegex = /^[А-Яа-яЁёA-Za-z\s]+$/; // Только буквы и пробелы
        if (typeof productName !== "string" || !productNameRegex.test(productName) || productName.length < 3) {
            errors.push(
                "Название продукта/услуги должно содержать только буквы, пробелы и быть не менее 3 символов."
            );
        }

        // Проверка количества
        const quantityValue = parseInt(quantity, 10);
        if (isNaN(quantityValue) || quantityValue < 1 || quantityValue > 1000) {
            errors.push("Введите количество от 1 до 1000.");
        }

        // Проверка даты доставки
        const currentDate = new Date().toISOString().split("T")[0];
        if (!deliveryDate || deliveryDate < currentDate) {
            errors.push("Введите корректную дату доставки (не ранее сегодняшнего дня).");
        }

        // Проверка способа доставки
        if (!deliveryMethod) {
            errors.push("Выберите способ доставки.");
        }

        // Очистка сообщений об ошибках
        const errorContainer = orderForm.querySelector(".error-messages");
        errorContainer.innerHTML = "";
        const resultContainer = document.querySelector(".order-result");
        resultContainer.innerHTML = "";

        if (errors.length > 0) {
            // Отображение ошибок
            errors.forEach((error) => {
                const errorElement = document.createElement("p");
                errorElement.textContent = error;
                errorElement.style.color = "red";
                errorContainer.appendChild(errorElement);
            });
        } else {
            // Успешная обработка формы
            resultContainer.innerHTML = `
                <h3>Данные заказа:</h3>
                <p><strong>Название продукта/услуги:</strong> ${productName}</p>
                <p><strong>Количество:</strong> ${quantityValue}</p>
                <p><strong>Дата доставки:</strong> ${deliveryDate}</p>
                <p><strong>Способ доставки:</strong> ${deliveryMethod}</p>
                ${comments ? `<p><strong>Комментарии:</strong> ${comments}</p>` : ""}
            `;
            resultContainer.style.display = "block";
        }
    });
});
