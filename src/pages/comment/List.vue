<template>
    <div>
        <!--按钮-->
        <el-button type="success" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small">批量删除</el-button>
        <!--按钮结束-->
        <el-table :data="comment">
            <el-table-column prop="id" label="编号" fixed="left"></el-table-column>
            <el-table-column prop="content" label="内容" fixed="left"></el-table-column>
            <el-table-column prop="comment_time" label="评论时间"></el-table-column>
            <el-table-column prop="order_id" label="序号"></el-table-column>
            <el-table-column label="操作" fixed="right">
        <template v-slot="slot">
          <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
          <a href="" @click.prevent="toUpdateHandler">修改</a>
        </template>
      </el-table-column>
        </el-table>
        <!-- 分页开始 -->
    <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    <!-- /分页结束 -->
    <!-- 模态框 -->
    
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="60%">
      测试：{{form}}
      <el-form :moduel="form" label-width="80px"> 
        <el-form-item label="内容">
          <el-input v-model="form.content"/>
        </el-form-item>
        <el-form-item label="评论时间">
          <el-input type="time" v-model="form.commentTime"/>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="form.orderId"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModalHandler">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /模态框 -->
    </div>
</template>


<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {//暴露接口
     data() {
     return { 
        title:"录入评论信息",
            visible:false,
            employees:[],
            form:{
              type:"comment"

            }
        }
    },created(){
      this.loadData();
    }, methods:{  
        loadData(){
          let url="http://localhost:6677/comment/findAll"
          //this->vue实例，通过vue实例访问该实例中的数据，methods
          //this.title/this.toAddHandler
          request.get(url).then((response)=>{
            this.comment=response.data;
            //箭头函数中的this指回
          })
     },

      submitHandler(){
        let url="http://localhost:6677/comment/findAll"
        //前端向后台发送请求，完成数据的保存操作
      request({
        url,
        method:"post",
        //告诉给后台我的请求体中放的是查询字符串
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        //请求体中的数据：将this.form转换为查询字符串的发送给后台
        data:querystring.stringify(this.form)
      }).then((response)=>{
        this.closeModalHandler();
        this.loadData();
        this.$message({
          type:"success",
          message:response.message
        })
      })
      },
    toDeleteHandler(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
      
    },toUpdateHandler(){
      this.visible = true;  
    },closeModalHandler(){
      this.visible = false;
    }, toAddHandler(){
      this.visible = true;
    }
  },
 data(){
    return {
      visible:false,
      comment:[],
      form:{
        type:"comment"
      }
    }
  },
  created(){
    // this为当前vue实例对象
    // vue实例创建完毕 
    this.loadData()

    }
}
</script>

<style scoped>

</style>