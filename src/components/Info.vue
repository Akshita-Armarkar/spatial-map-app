<template>
    <div class="info-box">
        <div class="title">{{ title }}</div>
        <div class="info">{{ info }}</div>
    </div>
 </template>
 
 <script>
 
 export default {
   name: 'Info-Box',
   props: {
    info: String,
    title: String
   },
 }
 </script>
 
 <style scoped lang="scss">
    .info-box{
        .title{
            font-weight: 700;
            padding-bottom: 10px;
        }
    }
 </style>