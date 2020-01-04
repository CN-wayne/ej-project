<template>
    <div>
      <div>
        <el-button type="success" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small">批量删除</el-button>
      </div>

        <el-table :data="employee">
            
            <el-table-column fixed="left" prop="id" laber="编号"></el-table-column>
            <el-table-column fixed="left" prop="username" label="用户名"></el-table-column>
             <el-table-column fixed="left" prop="realname" label="真实姓名"></el-table-column>
            <el-table-column fixed="left" prop="gender" label="性别"></el-table-column>
            <el-table-column prop="telephone" width="200" label="联系方式"></el-table-column>
            <el-table-column prop="idCard" width="200" label="身份证号"></el-table-column>
            <el-table-column prop="bankCard" width="200" label="银行卡号"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template v-slot="slot">
          <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
          <a href="" @click.prevent="toUpdateHandler">修改</a>
        </template>
            </el-table-column>
            


        </el-table>
        <!--分页开始-->
        <el-pagination background   layout="prev, pager, next" :total="50">
        </el-pagination>
        <!--分页结束-->
         <!--模态框-->
        <el-dialog
            title="录入员工信息"
            :visible.sync="visible"
            width="60%" >
            --{{form}}
            <el-form :model="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <el-form-item label="性别">

            <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
          
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="form.bankCard"></el-input>
        </el-form-item>

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="closeModalHandler">取 消</el-button>
                <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import request from '@/utils/request'
import querystring from 'querystring'//查询数据传，josn

import { format } from 'url';

export default {//暴露接口
// /
    data(){
        return{
            title:"录入员工信息", 
            visible:false,
            employee:[],
            form:{
              type:"waiter"
            }
        }
    },
    created(){
      this.loadData();
    },
      methods:{
    submitHandler(){
           let url = "http://localhost:6677/waiter/saveOrUpdate";
           request({
             url,
             method:"post",
             headers:{
               "Content-Type":"application/x-www-form-urlencoded"
             },
              data:querystring.stringify(this.form)
      }).then((response)=>{
                //模态框关闭
                this.closeModalHandler();
                //刷新
                this.loadData();
                //关闭模态框
                this.$message({
                    type:"success",
                    message:response.message
                })
            })
        },
     loadData(){
          let url="http://localhost:6677/waiter/findAll"
          request.get(url).then((response)=>{
            this.employee = response.data;
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
        },
     toUpdateHandler(){
      this.visible = true
    },
    toAddHandler(){
            this.visible=true
            this.title="录入111员工信息"
        },
         toDeleteHandler(){
            this,visible=true
            this.title="删除员工信息"
        },
    closeModalHandler(){
      this.visible = false
    }
    
  },
    
}
</script>
<style scoped>


</style>
