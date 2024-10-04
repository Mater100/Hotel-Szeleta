document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Form adatok lekérése
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;

    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Üzenetek alaphelyzetbe állítása
    successMessage.textContent = "";
    errorMessage.textContent = "";

    // Alap validáció
    if (name === "" || email === "" || checkin === "" || checkout === "" || guests === "") {
        errorMessage.textContent = "Minden mezőt ki kell tölteni!";
        return;
    }

    // Email validáció egyszerű regex-szel
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Érvényes email címet adj meg!";
        return;
    }

    // Dátumok validálása
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const today = new Date();

    if (checkinDate < today) {
        errorMessage.textContent = "Az érkezési dátum nem lehet korábbi, mint a mai nap!";
        return;
    }

    if (checkoutDate <= checkinDate) {
        errorMessage.textContent = "A távozás dátuma későbbi kell, hogy legyen, mint az érkezés dátuma!";
        return;
    }

    // Vendégek számának ellenőrzése
    if (guests < 1) {
        errorMessage.textContent = "A vendégek számának legalább 1-nek kell lennie!";
        return;
    }

    // Ha minden rendben, sikeres foglalás üzenet megjelenítése
    successMessage.textContent = `Köszönjük ${name}, a foglalás sikeres! Érkezés: ${checkin}, Távozás: ${checkout}, Vendégek száma: ${guests}.`;
    errorMessage.textContent = "";
});
