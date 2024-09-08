const allinputs = $(".contactSection input");
const nameInput = $(allinputs.eq(0));
const emailInput = $(allinputs.eq(1));
const phoneInput = $(allinputs.eq(2));
const ageInput = $(allinputs.eq(3));
const passwordInput = $(allinputs.eq(4));
const repasswordInput = $(allinputs.eq(5));
const submitButton = $(".contactSection button");

export function validateInputs() {
  const nameRegex = /^[a-zA-z]{3,20}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex = /^01[0-25][0-9]{8}$/;
  const ageRegex = /\b(100|[1-9][0-9]?)\b/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  allinputs.focus((e) => {
    if ($(e.target).val() == "") {
      $(e.target).next().removeClass("d-none");
    }
  });

  const formInputRegex = {
    name: { regex: nameRegex, input: nameInput, hasError: true },
    email: { regex: emailRegex, input: emailInput, hasError: true },
    phone: { regex: phoneRegex, input: phoneInput, hasError: true },
    age: { regex: ageRegex, input: ageInput, hasError: true },
    password: { regex: passwordRegex, input: passwordInput, hasError: true },
    "re-password": {
      regex: passwordRegex,
      input: repasswordInput,
      hasError: true,
    },
  };

  allinputs.keyup((e) => {
    if (
      !formInputRegex[e.target.id]?.regex.test(
        formInputRegex[e.target.id].input.val()
      ) ||
      (e.target.id === "re-password" &&
        repasswordInput.val() !== passwordInput.val())
    ) {
      $(e.target).next().removeClass("d-none");
      formInputRegex[e.target.id].hasError = true;
    } else {
      $(e.target).next().addClass("d-none");
      formInputRegex[e.target.id].hasError = false;
    }

    for (const { hasError } of Object.values(formInputRegex)) {
      if (hasError) {
        submitButton.addClass("disabled");
        return;
      }
    }
    submitButton.removeClass("disabled");
  });
}
