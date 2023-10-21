<template>
    <div class="container">
      <div class="calendar">
        <div class="month">
          <i class="fas fa-angle-left prev" @click="prev"></i>
          <div class="date">
            <h1>{{ currentMonth }}</h1>
            <p>{{ currentDate }}</p>
          </div>
          <i class="fas fa-angle-right next" @click="next"></i>
        </div>
        <div class="weekdays">
            <div v-for="(day, i) in weekdays" :key="i"></div>
        </div>
        <div class="days">
            <div v-for="(day, i) in calendarDays" :key="i" :class="dayClass(day)" @click="handleDayClick(day)">{{ day.number }}</div>
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
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }
    },
    computed: {
        currentMonth() {
           return this.getMonthName(this.date.getMonth());
        },
        currentDate() {
            return this.date.toDateString();
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

            return days;
        }
    },
    methods: {
        getMonthName(monthIndex) {
            const months = [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ];
            return months[monthIndex];
        },
        dayClass(day) {
            return {
                "prev-date": day.prevMonth,
                "today": !day.prevMonth && this.isToday(day.number),
                "selected": !day.prevMonth && this.isSelected(day.number)
            };
            // Logic to determine the CSS class for each day
            // Modify your existing logic here
        },
        prev() {
            this.date.setMonth(this.date.getMonth() - 1);
            // Call a function to update calendarDays and re-render the calendar
        },
        next() {
            this.date.setMonth(this.date.getMonth() + 1);
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
        // Call a function to initialize and render the calendar
        // You can use your existing renderCalendar function here
    }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

html {
  font-size: 62.5%;
}

.container {
  width: 100%;
  height: 100vh;
  background-color: #12121f;
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

.prev-date,
.next-date {
  opacity: 0.5;
}

.today {
  background-color: #167e56;
}

</style>