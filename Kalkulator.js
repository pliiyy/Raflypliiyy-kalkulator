$(function () {
    let input1 = "";
    let input2 = "";
    let operasiSelected = null;

    // Fungsi untuk memperbarui hasil perhitungan di kotak hasil saja
    function tampilkanHasil(hasil) {
        $("#hasil").text(hasil); // Menampilkan hasil di kotak hasil
    }

    // Ketika tombol angka ditekan
    $(".tombol-angka").click(function () {
        let angka = $(this).text();

        if (operasiSelected == null) {
            input1 += angka;
            $("#input1").text(input1);
        } else {
            input2 += angka;
            $("#input2").text(input2);
        }
    });

    // Ketika tombol titik (.) ditekan
    $(".tombol-dot").click(function () {
        if (operasiSelected == null) {
            if (!input1.includes(".")) {
                input1 += (input1 === "") ? "0." : ".";
                $("#input1").text(input1);
            }
        } else {
            if (!input2.includes(".")) {
                input2 += (input2 === "") ? "0." : ".";
                $("#input2").text(input2);
            }
        }
    });

    // Ketika tombol operasi ditekan
    $(".tombol-operasi").click(function () {
        if (input1) {
            operasiSelected = $(this).text();
            $("#operasi-selected").text(operasiSelected);
        }
    });

    // Toggle negatif
    $(".toggle-negatif").click(function () {
        if (operasiSelected == null) {
            input1 = String(-parseFloat(input1 || 0));
            $("#input1").text(input1);
        } else {
            input2 = String(-parseFloat(input2 || 0));
            $("#input2").text(input2);
        }
    });

    // Faktorial
    $(".tombol-faktorial").click(function () {
        if (operasiSelected == null && input1) {
            input1 = String(factorial(parseInt(input1)));
            $("#input1").text(input1);
        }
    });

    // Ketika tombol hitung (=) di bagian bawah ditekan
    $("#btn-hitung").click(function () {
        if (input1 && input2 && operasiSelected) {
            let hasil = hitung(input1, input2, operasiSelected); // Hitung hasilnya
            tampilkanHasil(hasil); // Menampilkan hasil di kotak hasil saja

            // Simpan nilai-nilai awal di setiap kotak dan tampilkan ulang
            $("#input1").text(input1);           // Kotak pertama tetap menampilkan input1
            $("#input2").text(input2);           // Kotak ketiga tetap menampilkan input2
            $("#operasi-selected").text(operasiSelected); // Kotak kedua tetap menampilkan operasi
            $("#hasil-temporer").text("=");      // Kotak keempat tetap menampilkan simbol '='

            // Reset variabel input dan operasi agar siap untuk perhitungan baru
            input1 = hasil; // Tetap simpan hasil sebagai input1 untuk perhitungan berikutnya
            input2 = "";
            operasiSelected = null;
        }
    });

    // Clear
    $("#btn-clear").click(function () {
        input1 = "";
        input2 = "";
        operasiSelected = null;

        // Kosongkan semua kotak termasuk kotak hasil, dan kembalikan simbol default
        $("#input1, #input2, #operasi-selected, #hasil, #hasil-temporer").text("...");
    });

    // Fungsi perhitungan
    function hitung(angka1, angka2, operasi) {
        let result;
        angka1 = parseFloat(angka1);
        angka2 = parseFloat(angka2);
        switch (operasi) {
            case "+": result = angka1 + angka2; break;
            case "-": result = angka1 - angka2; break;
            case "x": result = angka1 * angka2; break;
            case "/": result = angka1 / angka2; break;
            case "%": result = angka1 % angka2; break;
            case "^": result = Math.pow(angka1, angka2); break;
        }
        return result;
    }

    // Fungsi faktorial
    function factorial(n) {
        return (n <= 1) ? 1 : n * factorial(n - 1);
    }
});
