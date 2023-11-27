# API Docs: https://reqable.com/docs/capture/addons

from reqable import *
# import os
   
def onRequest(context, request):
  # 打印请求方法，例如：POST
  # print(request.method)
  # 打印请求路径，例如：/foo
  print(request.path)
  # print(request.headers)
  print(request.headers['authorization'])
  # print(os.getcwd())
  
  if (request.headers['authorization']):
    with open(r"C:\Users\92536\Desktop\token.txt", encoding="utf-8",mode="a") as file:  
      file.write('\n' + request.headers['authorization']) 
      print('写入成功！')

  # Done
  return request

def onResponse(context, response):
  # Update status code
  # response.code = 404

  # APIs are same as `onRequest`

  # Done
  return response