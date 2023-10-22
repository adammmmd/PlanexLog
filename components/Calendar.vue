<template>
    <div class="container">
      <div class="calendar">
        <div class="month">
          <button class="prev" @click="prev">&#8249;</button>
          <div class="date">
            <h1>{{ todaysMonth }}</h1>
            <p>{{ todaysYear }}</p>
          </div>
          <button class="next" @click="next">&#8250;</button>
        </div>
        <div class="weekdays">
            <div v-for="(day, i) in weekdays" :key="i">{{ day }}</div>
        </div>
        <div class="days">
            <div v-for="(day, i) in days" :key="i" :class="dayClass(day)" @click="handleDayClick(day)">{{ day.number }}</div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            date: new Date(),
            selectedDate: null,
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            days: [],
            todaysMonth: "",
            todaysYear: ""
        }
    },
    computed: {
        
    },
    methods: {
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
                days.push({ number: prevLastDay - x + 1, prevMonth: true });
            }

            // Days from current month
            for (let i = 1; i <= lastDay.getDate(); i++) {
                days.push({ number: i, prevMonth: false });
            }

            // Days from next month
            for (let j = 1; j <= nextDays; j++) {
                days.push({ number: j, prevMonth: true });
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
    }
}
</script>

<style scoped>

.container {
  width: 100%;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar {
  width: 45rem;
  height: 52rem;
  background-color: #222227;
  box-shadow: 0 0.5rem 3rem rgba(0, 0, 0, 0.4);
}

.month {
  width: 100%;
  height: 12rem;
  background-color: #167e56;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  text-align: center;
  text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
}

.month i {
  font-size: 2.5rem;
  cursor: pointer;
}

.month h1 {
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
}

.month p {
  font-size: 1.6rem;
}

.weekdays {
  width: 100%;
  height: 5rem;
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
  text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
}

.days {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem;
}

.days div {
  font-size: 1.4rem;
  margin: 0.3rem;
  width: calc(40.2rem / 7);
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  transition: background-color 0.2s;
}

.days div:hover:not(.today) {
  background-color: #262626;
  border: 0.2rem solid #777;
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
  background-color: #167e56;
}

</style>