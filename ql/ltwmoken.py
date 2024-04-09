import os
import pyperclip

def process_folder(folder_path):
    # 用于存储已提取的 Authorization 值
    authorization_set = set()

    # 用于存储最终结果的列表
    result_list = []

    # 列出文件夹中的所有文件
    for file_name in os.listdir(folder_path):
        # 构建文件的完整路径
        file_path = os.path.join(folder_path, file_name)
        # 如果是文件而不是文件夹
        if os.path.isfile(file_path):
            # 打开文件并读取内容
            with open(file_path, 'r') as file:
                file_content = file.read()
                # 以换行符分割文件内容为行，并遍历每一行
                for line in file_content.split('\n'):
                    # 如果当前行包含 'Authorization'，则提取其值
                    if 'Authorization' in line:
                        authorization_value = line.split(': ')[1]
                        # 如果提取到的值不在集合中，则输出并加入集合
                        if authorization_value not in authorization_set:
                            result_list.append(f'name=账号{len(authorization_set)+1};ck={authorization_value}')
                            authorization_set.add(authorization_value)

    # 将结果列表连接成字符串，并且用 "&" 连接所有的值
    result_string = '&'.join(result_list)

    # 将结果复制到剪贴板
    pyperclip.copy(result_string)

    # 追加到文件
    with open(output_file, 'a', encoding='utf-8') as file:
        file.write(f'ltck="{result_string}"\n')  # 添加换行符以保持文件格式

    print(f"已复制到剪贴板，并追加到 {output_file}")


    return result_string

# 调用函数并传入文件夹路径，获取结果
folder_path = r'C:\Users\92536\Desktop\test'
output_file = './.env.local'
result = process_folder(folder_path)
print(result)