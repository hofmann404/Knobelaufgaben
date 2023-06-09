# Dokumentation und Herangehensweise
## Funktion 1: ```invertiereSatz(satz)```

Der erste Gedanke für eine Lösung dieses Problems war, einen leeren Array zu erzeugen. Die Wörter des Satzes werden dann mit der ```split()``` Methode in ein Array umgewandelt, mit dem SPACE Argument werden die Wörter anhand des SPACE seperiert. Dieser Array wird dann invertiert mit der ```reverse()``` Methode und dann wird jedes Element mit der ```forEach()``` Methode, welche eine Callback-Funktion als Argument nimmt zu dem "invertiert" Array gepusht, mit der ```push()``` Methode. Es muss theoretisch kein "invertiert" Array erzeugt werden, dies wurde nur gemacht, um die Lesbarkeit zu verbessern.<br>
Als kleines extra Feature, hab ich noch sichergestellt, dass das Satzschlusszeichen, wenn eines am **Ende** des Satzes vorhanden ist. Entfernt wird und an das Ende vom invertierten Satz hinzugefügt wird. Letztendlich wird der Array zu einem String konvertiert mit der ```join()``` Methode und einem SPACE als Argument, sodass jedes Element des Arrays durch ein Leerzeichen getrennt wird. 


```js
function invertiereSatz(satz) {
  let invertiert = new Array();

  const satzschlusszeichen = "!?.";
  satz
    .split(" ")
    .reverse()
    .forEach((wort) => {
      invertiert.push(wort);
    });

  if (satzschlusszeichen.includes(invertiert[0].slice(-1))) {
    satzschlusszeichen = invertiert[0].slice(-1);
    invertiert[0] = invertiert[0].replace(satzschlusszeichen, "");
    invertiert[invertiert.length - 1] =
      invertiert.slice(-1) + satzschlusszeichen;
  }
  return invertiert.join(" ");
}
```


<br>

## Funktion 2: ```istInteger(zahl)```

Ich habe keinen Weg gefunden, eine Funktion zu schreiben, welche bei ```istInteger(1.0) false``` aber bei ```istInteger(1) true``` zurückgibt. Ich hatte die Funktion mit der Annahme geschrieben, dass ```1.0 === 1``` ist. Die Methode ```Number.isInteger()``` gibt nämlich bei beiden Zahlen true zurück. Ich habe es trotzdem versucht, aber bei Recherche ebenfalls keinen Weg gefunden. Ein Plan war, eine Type Conversion zum String durchzuführen, aber selbst diese gibt bei ``` 1.0.toString() -> 1``` zurück. Der floating point kann zwar mit der Conversion mithilfe der ```toFixed(nachkommastellen)``` Methode erhalten bleiben jedoch kann ich dies ja nicht nur spezifisch auf floats anwenden, weil ich davor prüfen müsste, ob es überhaupt eine float ist. Ein weiterer Ansatz war, mit der strikten Vergleichung zu arbeiten: ``` 1.0 === 1 ``` leider ergibt dies auch ```true```.



```js
function istInteger(zahl) {
  zahl = zahl.toString().replace(",", ".");
  zahl = parseFloat(zahl);
  if (Math.round(zahl) === zahl) return true;
  return false;
}
```
<br>

## Funktion 3: ```fizzBuzz()```

Bei diesem Problem war der erste Gedanke eine for-loop zu erstellen mit 100 Iterationen. Bei jeder Zahl i wird mit if-Statements geprüft, ob die Zahl zuerst einen Rest von 0 bei der Division von 15 hat, weil somit der **&&** Operator vermieden werden kann und nicht das Problem auftritt, dass z.B. geprüft wird, ob 15 geteilt durch 3 einen Rest von 0 hat und darauf nur "fizz" ausgegeben wird und gar nicht geprüft wird, ob es auch durch 5 teilbar ist, mit einem Rest von 0. Die Division durch 15 ist darum die erste Kondition. Damit ist es egal, ob daraufhin zuerst 3 oder 5 geprüft wird.

```js
function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 == 0) console.log("fizzbuzz");
    else if (i % 3 == 0) console.log("fizz");
    else if (i % 5 == 0) console.log("buzz");
    else console.log(i);
  }
}
```



<br>

## Funktion 4: ```istAnagramm(wort1, wort2)```



Ein Anagramm hat immer die gleiche Anzahl von Buchstaben, wenn dies nicht der Fall ist, ist gleich sicher, dass es kein Anagramm ist, dies wird als erstes geprüft, indem die Länge der Wörter mithilfe der ```length``` Property verglichen wird und ```false``` als return value gilt, wenn die Länge ungleich ist. Davor werden beide Wörter mit der ```toLowerCase()``` Methode zu Kleinbuchstaben konvertiert, um folgende Prozesse zu erleichtern. Es werden zwei Konstante leere Objekte erstellt. Danach wird durch beide Wörter geloopt mit einer for-of loop. Wenn ein Charakter key des Wortes nicht im Objekt existiert, kann dessen value auch nicht inkrementiert werden, darum wird mit bei solch einem Fall mit dem logischen Operator ```||``` dem Charakter ein value von 0 zugewiesen, anstatt undefined. Wenn der key existiert, wird er inkrementiert. Zuletzt wird mit einer for-Schleife, welche durch das ```counter1``` Objekt loopt für jeden Charakter, dessen value mit dem von dem gleichen Charakter vom ```counter2``` objekt verglichen, wenn dies einmal nicht übereinstimmt, wird ```false``` zurückgegeben. Wenn alles übereingestimmt hat und die Schleife fertig ist, wird ```true``` zurückgegeben.

```js
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
```
<br>

## Funktion 5: ```mult(a)(b)```

Diese Funktion verwendet Closures in JavaScript und zugleich die ES6 Arrow Function Expressions, welche nicht gehoisted sind, darum ist zu beachten, dass die Funktion deklariert wird, bevor sie aufgerufen wird. Die Funktion ```mult()``` nimmt einen Parameter ```a``` an und gibt eine Funktion zurück, welche ```b``` als Parameter nimmt. Diese innere Funktion gibt dann das Ergebnist von ```a * b``` zurück. ```mult()``` ist hier die Higher-Order Funktion, da die andere Funktion ein Teil dieser Funktion ist. Diese innere Funktion hat Zugriff auf alle Variablen etc. der Higher-Order Funktion, darum kann sie das ```a``` verwenden und damit die Multiplikation berechnen. 

```js
const mult = (a) => {
  return (b) => a * b;
};

```

Dies kann natürlich dann auch immer so weiter gehen:
 ```js 
function add(x){
    return function (y){
        return function (z){
            return x + y + z
        }
    }
}

console.log(add(1)(2)(3)) // -> 6

```
