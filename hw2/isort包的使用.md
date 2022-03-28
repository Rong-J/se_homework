# isort包的使用

###### 谢融 41911030

## 一、简介

​	isort是一个实用的**Python**程序/库，用于按照**字母表顺序**对**imports**进行排序，并自动按类型（标准库/第三方仓库/自己的模板等等）划分部分。它还为各种编译器提供了命令行程序、Python库和插件，以快速对所有导入进行排序。

## 二、安装与使用

1.安装：

- 简单安装：*pip install isort*
- 安装isort并支持requirements.txt：*pip install isort[requirements_deprecated_finder]*
- 带Pipfile支持的isort安装：*pip install isort[pipfile_deprecated_finder]*
- 支持上述两种格式的isort安装：*pip install isort[requirements_deprecated_finder,pipfile_deprecated_finder]*

2.使用（命令行）：

- 在特定文件上运行：*isort mypythonfile.py*
- 递归的使用：*isort .* ；如果开启了globstar，则*isort .*等价于*isort **/*.py*
- 仅查看isort将做出的变量，但并不应有：*isort mypythonfile.py --diff*
- 以原子方式对项目运行isort，仅在不引入语法错误的情况下应用更改：*isort --atomic .*

3.在Python内使用：

```python
import isort

isort.file("pythonfile.py")
```

## 三、实例说明

原代码：

```python
from my_lib import Object

import os

from my_lib import Object3

from my_lib import Object2

import sys

from third_party import lib15, lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8, lib9, lib10, lib11, lib12, lib13, lib14

import sys

from __future__ import absolute_import

from third_party import lib3

print("Hey")
print("yo")
```

用isort排序后的代码：

```python
from __future__ import absolute_import

import os
import sys

from third_party import (lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8,
                         lib9, lib10, lib11, lib12, lib13, lib14, lib15)

from my_lib import Object, Object2, Object3

print("Hey")
print("yo")
```

​	可以看出使用了isort以后的import代码段更加的清晰简洁。

## 四、isort部分命令行选项与解释

| 命令选项                                          | 解释                                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| -h, --help                                        | 显示此帮助信息并退出                                         |
| -V, --version                                     | 显示当前安装的 isort 版本                                    |
| --vn, --version-number                            | 返回仅有当前版本数字而没有 logo 的版本信息                   |
| -v, --verbose                                     | 显示详细输出，例如跳过文件或检查成功                         |
| --only-modified, --om                             | 禁用关于未修改文件的详细输出                                 |
| --dedup-headings                                  | 告知 isort 只显示一次相同的自定义 import 标题注释，即使有多个部分设置了注释组 |
| -q, --quiet                                       | 显示更少的输出，仅输出错误信息                               |
| -d, --stdout                                      | 强制将结果输出至 stdout 标准输出，而不是就地更改             |
| --overwrite-in-place                              | 告知 isort 使用相同的文件句柄就地覆盖重写与标准方法相比，性能和内存使用情况会有所下降，但可确保所有文件标志和模式保持不变 |
| --show-config                                     | 查看 isort 的确定配置，以及配置选项的来源                    |
| --show-files                                      | 查看在当前选项下，哪些文件会被 isort 处理                    |
| --df, --diff                                      | 显示 isort 将对一个文件做出的所有更改的 diff ，而不是就地更改 |
| -c, --check-only, --check                         | 检查文件中是否存在未排序/未格式化的 import 并将它们打印到命令行而不修改文件。当没有任何变化时返回 0，当文件被重新格式化时返回 1 |
| --ws, --ignore-whitespace                         | 当使用了 --check-only 选项时，告知 isort 忽略空格的差异      |
| --sp SETTINGS_PATH, --settings-path SETTINGS_PATH | 显式设置设置路径或文件，而不是根据文件位置自动确定           |
| --profile PROFILE                                 | 用于配置的基本配置文件类型                                   |
| --old-finders, --magic-placement                  | 使用依赖于环境自省魔术方法的旧的已弃用的查找器逻辑           |
| -j [JOBS], --jobs [JOBS]                          | 要并行处理的文件数                                           |
| --ac, --atomic                                    | 如果生成的文件包含语法错误，则确保不会保存输出               |
| --interactive                                     | 告知 isort 以交互方式应用更改                                |
| --format-error FORMAT_ERROR                       | 覆盖用于打印错误的格式                                       |
| --format-success FORMAT_SUCCESS                   | 覆盖用于打印成功的格式                                       |

## 五、isort内的函数

| 函数                           | 作用                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| isort.code                     | 接收一个包含代码的字符串，并在对 import 排序后返回它         |
| isort.check_code               | 接收一个包含代码的字符串，如果所有 import 都已经正确排序，则返回 true ，否则返回 false |
| isort.stream                   | 接收一个包含 Python 代码的输入流和一个输出流。向输出流输出已经对 import 进行了排序的代码 |
| isort.check_stream             | 接收一个包含 Python 代码的输出流，如果所有 import 都已经正确排序，则返回 true，否则返回false |
| isort.file                     | 接收 Python 源文件的路径，并就地对 import 进行排序           |
| isort.check_file               | 接收 Python 源文件的路径，如果所有 import 都已经正确排序，则返回 true，否则返回 false |
| isort.place_module             | 将模块的名称作为字符串并返回为其确定的分类                   |
| isort.place_module_with_reason | 将模块的名称作为字符串并返回为其确定的分类，并给出确定该分类的原因 |
