$('.corporations_slider').slick({
  slidesToShow: 4,
  arrows: false,
  dots: true,
  slidesToScroll: 3,
  adaptiveHeight: true,
  initialSlide: 3,
})

let selector = document.querySelectorAll('input[type="tel"]')
let im = new Inputmask('+380(99) 999-99-99')
im.mask(selector)

let form = document.forms.registrationForm;
let userName = form.elements.userName;
let userEmail = form.elements.email;
let userPhone = form.elements.tel;
let btn = document.querySelector('.registration_btn');
let modal = document.querySelector('.modal');
let check = document.querySelector('input[type="checkbox"]');


let validatePhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
let validateEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

btn.addEventListener('click', function (e) {
  e.preventDefault();
  if (userName.value == '') {
    userName.style.borderColor = '#eb5757'
  } else {
    userName.style.borderColor = ''
  }
  if (!validateEmail.test(userEmail.value)) {
    userEmail.style.borderColor = '#eb5757'
  } else (
    userEmail.style.borderColor = ''
  )
  if (!validatePhone.test(userPhone.value)) {
    userPhone.style.borderColor = '#eb5757'
  } else {
    userPhone.style.borderColor = '';
  } 
  if (check != check.checked) {
    check.style.boxShadow = '0px 0px 10px 0px #eb5757';
  } 

  if (userName.value == ' ', validateEmail.test(userEmail.value), validatePhone.test(userPhone.value) && check.checked) {
    modal.classList.add('modal__visible');
  }
})

$('#footerTopArrow').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 800);
})
