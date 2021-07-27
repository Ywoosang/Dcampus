 <template>
  <div class="wrapper">
    <side-bar></side-bar>
    <div class="bck">
      <div class="nav">
        <div>
          <h2>{{post.title}}</h2>
          <div>
              작성자 : {{post.username}} 
              작성일: {{ post.created_at}}
                <div v-if="isUpdated">(수정됌){{ post.updated_at}}</div>

          </div>
        </div>
      </div>
      <div class="post">
        <div class="post-content">
          <div>{{post.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../services/Api";
import SideBar from "./common/Sidebar";
 
export default {
    props : ['id'],
    data(){
        return {
           post : {
               title : '',
               content : '',
               fileid : '',
               created_at : '',
               updated_at : '',
               username : '',
           }
        }
    },
    computed:{
        isUpdated(){
            return this.post.created_at !== this.post.updated_at;
        }
    },
    created(){
        Api().get(`/post/${this.id}`,{ withCredentials: true})
        .then(res=>{
            this.post = res.data.post[0]; 
            console.log(this.post);
        })
        .catch(error=>{
            console.log(error);
        })

    },
    components: {
        SideBar
    }

}
</script>

<style>
*{
    border:1px solid red;
    box-sizing: border-box;
}

.post{
    background-color: white;
    height: 50vh;
    padding: 1em;
}

</style>