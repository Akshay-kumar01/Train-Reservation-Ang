import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent {
  seating: number[][] = Array.from({ length: 11 }, () => Array(7).fill(0)).concat([Array(3).fill(0)]);
  rowLabels: string[] = Array.from({ length: 12 }, (_, i) => String.fromCharCode(65 + i));
  currentBookedSeats: string[] = [];
  seatsRequested: number = 0;

  bookSeats(): void {
    //Checking if seats to be requested lies in between 1 and 7 else throw an alert
    if (this.seatsRequested < 1 || this.seatsRequested > 7) {
      alert('Please request between 1 and 7 seats.');
      return;
    }

    let totalSeatsAvailable = this.seating.flat().filter(seat => seat === 0).length;
    //If seats requested are greater than total seats available, give a prompt
    if (this.seatsRequested > totalSeatsAvailable) {
      alert('Not enough seats available.');
      return;
    }

    let seatsToBook: string[] = [];
    let seatsRequestedCopy = this.seatsRequested;

    //Booking seats with all seats in a single row as priority
    for (let rowIndex = 0; rowIndex < this.seating.length; rowIndex++) {
      let availableSeats = this.seating[rowIndex]
        .map((seat, index) => (seat === 0 ? index : null))
        .filter(index => index !== null) as number[];

      if (availableSeats.length >= seatsRequestedCopy) {
        for (let i = 0; i < seatsRequestedCopy; i++) {
          this.seating[rowIndex][availableSeats[i]] = 1;
          seatsToBook.push(`${this.rowLabels[rowIndex]}${availableSeats[i] + 1}`);
        }
        this.currentBookedSeats = seatsToBook;
        return;
      }
    }

    for (let rowIndex = 0; rowIndex < this.seating.length; rowIndex++) {
      let availableSeats = this.seating[rowIndex]
        .map((seat, index) => (seat === 0 ? index : null))
        .filter(index => index !== null) as number[];

      for (let seatIndex of availableSeats) {
        if (seatsRequestedCopy > 0) {
          this.seating[rowIndex][seatIndex] = 1;
          seatsToBook.push(`${this.rowLabels[rowIndex]}${seatIndex + 1}`);
          seatsRequestedCopy--;
        } else {
          this.currentBookedSeats = seatsToBook;
          return;
        }
      }
    }
  }
}

