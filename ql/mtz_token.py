import pyperclip

def filter_and_convert_to_unique_string_with_numbering(input_file, keyword):
    filtered_lines = set()

    with open(input_file, 'r') as file:
        lines = file.readlines()
        for line in lines:
            if keyword in line:
                clean_line = line.strip()
                filtered_lines.add(clean_line)

    numbered_lines = [f'name=账号{index};ck={line}' for index, line in enumerate(filtered_lines, start=1)]

    result_string = '&'.join(numbered_lines)

    # 将结果复制到剪贴板
    pyperclip.copy(result_string)

    # 追加到文件
    with open(output_file, 'a', encoding='utf-8') as file:
        file.write(f'mtzv2ck="{result_string}"\n')  # 添加换行符以保持文件格式

    print(f"已复制到剪贴板，并追加到 {output_file}")
    
    return result_string

# 使用示例
input_file = r'C:\Users\92536\Desktop\token.txt'
output_file = './.env.local'
keyword = 'share:login'

output_string = filter_and_convert_to_unique_string_with_numbering(input_file, keyword)

# 打印连接后的字符串
print(output_string)






