<template>
  <div>
    <h1>Products</h1>
    <div v-for="edge in $page.products.edges" :key="edge.node._id">      
      <p>
        <b>{{ edge.node.name }}</b>
        <span>{{ edge.node.price }}</span>
      </p>
    </div>
  </div>
</template>

<style>
  p{
    display: flex;
    flex-direction: column;
    margin-left:30%;
  }
  h1{
    width: 100%;
    text-align: center;
  }
</style>

<page-query>
  query {
    products: allProductList {
      edges {
        node {      
          name
          _id
          price
        }
      }
    }
  }
</page-query>

<script>
import { Pager } from 'gridsome';
import PostSummary from '~/components/PostSummary.vue'

export default {
  components: {
    Pager,
    PostSummary
  }
}
</script>
