<template>
    <nav class="navbar">
        <div class="navbar-container">
            <nuxt-link class="nav-link" to="/plan" exact>Plans</nuxt-link>
            <nuxt-link class="nav-link" to="/calendar" exact>Calendar</nuxt-link>
            <nuxt-link class="nav-link" to="/profile" exact>Profile</nuxt-link>
        </div>
    </nav>
</template>

<script>


</script>

<style> 
.navbar {
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, -50%);
    z-index: 100;
}

.navbar-container {
    font-size: 20px;
    display: flex;
    justify-content: center;
    background: white;
    border: 3px solid black;
}

.nav-link {
    justify-self: stretch;
    border: 3px solid black;
    color: black;
    margin: 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    font-family: var(--ff-primary);
}

.nuxt-link-exact-active {
    background-color: yellow;
}

</style>

