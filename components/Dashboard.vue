<template>
    <nav class="btn-group btn-group-lg fixed-bottom mb-3 start-50 translate-middle-x" role="group">
        <nuxt-link class="btn btn-light btn-outline-dark border-2 rounded-0" to="/plan" exact>Plans</nuxt-link>
        <nuxt-link class="btn btn-light btn-outline-dark border-2 rounded-0" to="/calendar" exact>Calendar</nuxt-link>
        <nuxt-link class="btn btn-light btn-outline-dark border-2 rounded-0" to="/profile" exact>Profile</nuxt-link>
    </nav>
</template>

<script>


</script>

<style> 
/* .navbar {
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
} */

.nuxt-link-exact-active {
    background-color: yellow;
}

</style>

