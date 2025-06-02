# Tower Defense JS

## Podgląd
![image](https://github.com/user-attachments/assets/5b71748f-60a6-4623-8432-ef7550a0b7b3)

## Cel gry
Celem gry jest obrona bazy przed niekończącymi się falami wrogów. Gracz buduje i ulepsza wieże, aby powstrzymać przeciwników, zanim dotrą do bazy.

##  Jak uruchomić grę?
1. Sklonuj repozytorium
```
https://github.com/WilinskiW/TowerDefenceJS.git
```
2. Przejdź do folderu projektu i uruchom dwukrotnym kliknięciem `index.html`

### Główne funkcjonalności
* Budowanie wież (różne typy ulepszeń)
* Wrogowie poruszający się po ścieżce
* System fal przeciwników (automatyczne generowanie)
* Obrażenia bazy i przegrana
* Ulepszanie wież (zasięg, siła, szybkość)
* Zapis i wczytanie stanu gry (localStorage)
* Autosave co kilka sekund

### Opis modułów
* `main.js` - Główna pętla gry, rysowanie, sterowanie sceną
* `enemy.js` - Klasa przeciwnika, poruszanie się po mapie
* `tower.js` - Klasa wieży, logika ataku i ulepszania parametrów
* `waveManager.js	` - Zarządza falami przeciwnków
* `towerManager.js` - Obsługa interakcji użytkownika (kliknięcia, budowanie/ulepszanie)
* `config.js` - Konfiguracja stałych wartości (rozmiary, koszty, mapa)
* `renderer.js` - Funkcje rysujące wszystkie elementy gry
* `goldSack.js` - Prosty kontener na złoto gracza

### Technologie
* JavaScript (ES6+)
* HTML5 Canvas
* CSS/SCSS

<hr>

### Sterowanie
*  Kliknij przycisk wieży → kliknij na mapie, aby ją postawić
*  Kliknij przycisk ulepszenia → kliknij na istniejącą wieżę
*  Zapisz/Zresetuj grę klikając odpowiednie przyciski
*  Kliknij „Pokaż zasięg”, aby przełączać widoczność promieni wież
