/**
 * Класс для работы с логикой калькулятора
 */
let Calculator = new(function(){

    /**
     * Переменная для хранения поля с формулой и ответом
     */
    let inputField;

    /**
     * Поле для хранения формулы.
     * Защищает от внедрения в eval()
     * @type {string}
     */
    let inputString = "";

    /**
     * Добавить обработчки для каждой кнопки.
     */
    let addListnersToButton = () => {
        let elements = document.getElementsByTagName('button');
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click",onPressButton)
        }
    };

    /**
     * Обработчик нажатия кнопки.
     * @param event событие нажатия
     */
    let onPressButton = (event) => {
        let innerText = event.target.innerHTML;
        //Так как у нас только 3 управляющих символа
        //Удалить все, удлить последний символ, результат
        //Для них добавляем отдельную логику
        //Остально обрабатываем "по умолчанию"
        switch (innerText){
            case "CLR":
                clearInput();
                break;
            case "&lt;":
                undoInput();
                break;
            case "=":
                calculateResult();
                break;
            default:
                addValueToInput(innerText);
                break;
        }
        //Не забываем обновить значение в Input т.к пишем всё в переменную
        inputField.value = inputString;
    };

    /**
     * Получить значение того, что написано в Input
     */
    let calculateResult = () =>{
        if(inputString === 0){
            return;
        }

        inputString = eval(inputString);
    };

    /**
     * Добавить значение в Input
     * @param value - значение, которое надо добавить
     */
    let addValueToInput = (value) => {
        inputString+=value;
    };

    /**
     * Очистить поле ввода
     */
    let clearInput = () =>{
        inputString = "";
    };

    /**
     * Удалить последний символ с поля ввода
     */
    let undoInput = () => {
        if(inputString === 0){
            return;
        }
        inputString = inputString.substring(0,inputString.length-1);
    };

    /**
     * После загрузки страницы
     */
    document.addEventListener('DOMContentLoaded', function () {
        //Сохраняем DOM элемент, чтобы каждый раз его не искать.
        inputField = document.getElementById("calculatorInput");

        //На каждую кнопку вешаем обработчик
        addListnersToButton();
    });
});