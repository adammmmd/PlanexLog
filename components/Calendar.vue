<template>
    <div class="container">
      <div class="calendar border-main shadow-main">
        <div class="month">
          <button class="prev" @click="prev">&#8249;</button>
          <div class="date">
            <h1>{{ todaysMonth }} {{ todaysYear }}</h1>
          </div>
          <button class="next" @click="next">&#8250;</button>
        </div>
        <div class="weekdays">
            <div v-for="(day, i) in weekdays" :key="i">{{ day }}</div>
        </div>
        <div class="days">
            <div v-for="(day, i) in days" :key="i" :class="dayClass(day)" @click="handleDayClick(day)">
              {{ day.number }}
              <div
                class="event-indicator"
                v-if="hasEvent(day.date)"
              >
                &#9679;
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    props: {
      events: Array,
    },
    data() {
        return {
            date: new Date(),
            selectedDate: null,
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            days: [],
            todaysMonth: "",
            events: [],
            todaysYear: ""
        }
    },
    computed: {
        
    },
    methods: {
        hasEvent(date) {
          return this.events.some((event) => event.date.toDateString() === date.toDateString());
        },
        getMonthName(monthIndex) {
            const months = [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ];
            return months[monthIndex];
        },
        currentMonth() {
          this.todaysMonth = this.getMonthName(this.date.getMonth());
        },
        currentYear() {
          this.todaysYear = this.date.getFullYear();
        },
        dayClass(day) {
            return {
                "prev-date": day.prevMonth,
                "today": !day.prevMonth && this.isToday(day.number),
                "selected": !day.prevMonth && this.isSelected(day.number)
            };
        },
        calendarDays() {
        // Logic to generate an array of calendar days here
        // You can use your existing logic with some modifications
            const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
            const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
            const prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
            const firstDayIndex = firstDay.getDay();
            const lastDayIndex = lastDay.getDay();
            const nextDays = 7 - lastDayIndex - 1;

            console.log(firstDay, lastDay, prevLastDay, firstDayIndex, lastDayIndex, nextDays)

            const days = [];

            // Days from previous month
            for (let x = firstDayIndex; x > 0; x--) {
                const date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, prevLastDay - x + 1);
                days.push({ number: prevLastDay - x + 1, prevMonth: true, date }); // Tambahkan properti date
            }

            // Days from current month
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const date = new Date(this.date.getFullYear(), this.date.getMonth(), i);
                days.push({ number: i, prevMonth: false, date }); // Tambahkan properti date
            }

            // Days from next month
            for (let j = 1; j <= nextDays; j++) {
                const date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, j);
                days.push({ number: j, prevMonth: true, date }); // Tambahkan properti date
            }

            console.log(days)
            this.currentMonth()
            this.currentYear()

            this.days = days
        },
        prev() {
            console.log(this.date)
            this.date.setMonth(this.date.getMonth() - 1);
            console.log(this.date)
            this.calendarDays()
            // Call a function to update calendarDays and re-render the calendar
        },
        next() {
            console.log(this.date)
            this.date.setMonth(this.date.getMonth() + 1);
            console.log(this.date)
            this.calendarDays()
            // Call a function to update calendarDays and re-render the calendar
        },
        isToday(day) {
           const today = new Date();
            return day === today.getDate() && this.date.getMonth() === today.getMonth();
        },
        isSelected(day) {
            if (this.selectedDate) {
                return day === this.selectedDate.getDate() && this.date.getMonth() === this.selectedDate.getMonth();
            }
            return false;
        },
        handleDayClick(day) {
            if (!day.prevMonth) {
                this.selectedDate = new Date(this.date.getFullYear(), this.date.getMonth(), day.number);
            }
        }
    },
    mounted() {
      this.calendarDays()
      this.currentMonth()
      this.events = [
        { date: new Date(2023, 10, 5), title: "Meeting", details: "Detail meeting." },
        // Tambahkan event lainnya sesuai kebutuhan
      ];
      console.log(this.events)
    }
}
</script>

<style scoped>

.container {
  width: 50%;
  padding: 1rem;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar {
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 1rem;
  /* box-shadow: 0 0.5rem 3rem rgba(0, 0, 0, 0.4); */
}

.month {
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  /* text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5); */
}

.month i {
  font-size: 2.5rem;
  cursor: pointer;
}

.month h1 {
  font-size: 1.5rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
}

.month p {
  font-size: 1.6em;
}

.weekdays {
  width: 100%;
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
}

.weekdays div {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  width: calc(44.2rem / 7);
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5); */
}

.days {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(0, 1fr);
  gap: 2px;
  padding: 0.2rem;
  border: 2px solid black;
  border-radius: 4px;
}

.days div {
  font-size: 1.5rem;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.days div:hover:not(.today) {
  background-color: #dbc6ff;
  border-radius: 4px;
  cursor: pointer;
}

.prev,
.next {
  border: 3px solid black;
  width: 30px;
  aspect-ratio: 1;
  background-color: inherit;
}

.prev-date,
.next-date {
  opacity: 0.5;
}

.today {
  background-color: #B286FD;
  border: 2px solid black;
  border-radius: 4px;
}

@media only screen and (max-width: 37.5em){
  .container{
    width: 100%;
    margin-bottom: 3rem;
  }

  .days div{
    font-size: 1.2rem;
  }
}
</style>