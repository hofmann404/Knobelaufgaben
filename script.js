function invertiereSatz(satz) {
  let invertiert = new Array();

  let satzschlusszeichen = "!?.";
  satz
    .split(" ")
    .reverse()
    .forEach((wort) => {
      invertiert.push(wort);
    });

  // wenn Satz Satzschlusszeichen am Ende besitzt, wird es entfernt und am Ende
  // des invertierten Satzes hinzugefügt
  if (satzschlusszeichen.includes(invertiert[0].slice(-1))) {
    satzschlusszeichen = invertiert[0].slice(-1);
    invertiert[0] = invertiert[0].replace(satzschlusszeichen, "");
    invertiert[invertiert.length - 1] =
      invertiert.slice(-1) + satzschlusszeichen;
  }
  return invertiert.join(" ");
}

function istInteger(zahl) {
  // Es wird manuell berechnet jedoch könnte man leicht eine Methode benutzen
  // Number.isInteger(zahl) -> bool
  // Im Beispiel wurden anstatt floating points Kommas gegeben, darum
  // der untere Code, womit auch "3,4" als Arg gelten kann <string>"3,4" -> <float>3.4
  zahl = zahl.toString().replace(",", ".");
  zahl = parseFloat(zahl);
  if (Math.round(zahl) === zahl) return true;
  return false;
}

function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 == 0) console.log("fizzbuzz");
    else if (i % 3 == 0) console.log("fizz");
    else if (i % 5 == 0) console.log("buzz");
    else console.log(i);
  }
}

function istAnagramm(wort1, wort2) {
  wort1 = wort1.toLowerCase();
  wort2 = wort2.toLowerCase();

  if (wort1.length !== wort2.length) {
    return false;
  }

  const counter1 = {};
  const counter2 = {};

  for (let ch of wort1) {
    counter1[ch] = (counter1[ch] || 0) + 1;
  }
  for (let ch of wort2) {
    counter2[ch] = (counter2[ch] || 0) + 1;
  }
  for (let buchstabe in counter1) {
    if (counter1[buchstabe] !== counter2[buchstabe]) {
      return false;
    }
  }
  return true;
}

const mult = (a) => {
  return (b) => a * b;
};

const satz = "Dies ist eine Testaufgabe.";
const zahl1 = 12;
const zahl2 = 9.5;
const zahl3 = "9,5";
const wort1 = "Lager",
  wort2 = "Regal";
const wort3 = "Eis",
  wort4 = "Creme";
const zahl4 = 6,
  zahl5 = 5;

console.log(`Invertiert: ${invertiereSatz("Dies ist eine Testaufgabe.")}`);
console.log(`istInteger("${zahl1}"): ${istInteger(zahl1)}`);
console.log(`istInteger("${zahl2}"): ${istInteger(zahl2)}`);
console.log(`istInteger("${zahl3}"): ${istInteger(zahl3)}`);
fizzBuzz();
console.log(`Ist Anagramm ${wort1} ${wort2}: ${istAnagramm(wort1, wort2)}`);
console.log(`Ist Anagramm ${wort3} ${wort4}: ${istAnagramm(wort3, wort4)}`);
console.log(`mul(${zahl4})(${zahl5}): ${mult(zahl4)(zahl5)}`);
