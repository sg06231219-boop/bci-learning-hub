const PROJECTS = [
{id:1,title:"LED流水灯+按键中断",desc:"第一个STM32嵌入式项目：GPIO输出控制LED闪烁、按键中断消抖、定时器精确延时。这是所有后续BCI项目的基础。",difficulty:1,time:"3-5天",tags:["GPIO","中断","定时器"],lv:"Lv.1",cost:"¥25"},
{id:2,title:"串口Hello World+命令解析",desc:"UART printf重定向、中断接收、简单命令解析器（如'led on'/'led off'）。掌握串口通信是BCI数据传输的基础。",difficulty:1,time:"2-3天",tags:["UART","printf","通信"],lv:"Lv.1",cost:"¥25"},
{id:3,title:"OLED实时波形显示",desc:"I2C驱动SSD1306 OLED，将ADC采集的信号实时绘制波形。这是EEG可视化显示的前置技能。",difficulty:2,time:"3-5天",tags:["I2C","OLED","ADC"],lv:"Lv.2",cost:"¥30"},
{id:4,title:"ADC+DMA双缓冲连续采集",desc:"ADC定时器触发+DMA双缓冲采集→无数据丢失。这是BCI信号采集的核心——EEG数据绝不能丢失。",difficulty:2,time:"5-7天",tags:["ADC","DMA","双缓冲"],lv:"Lv.2",cost:"¥40"},
{id:5,title:"心电(ECG)信号采集",desc:"用AD8232模块采集自己的心电信号→嵌入式ADC→UART发送→PC Python+Matplotlib实时显示。完成'生物电信号→嵌入式采集→PC处理'全链路。",difficulty:2,time:"1-2周",tags:["ECG","AD8232","生物信号"],lv:"Lv.2-3",cost:"¥60"},
{id:6,title:"50Hz陷波FIR滤波器实现",desc:"在MCU上用CMSIS-DSP实现48阶50Hz工频陷波FIR滤波器。这是所有EEG系统必须的预处理步骤。理解FIR设计→系数计算→定点实现全流程。",difficulty:3,time:"1周",tags:["DSP","FIR","滤波"],lv:"Lv.3",cost:"¥30"},
{id:7,title:"实时α波检测+LED反馈",desc:"FFT实时计算α波段(8-13Hz)功率→闭眼时α增强→LED亮起。这是闭环神经反馈的最小可行系统——你的第一个闭环BCI！",difficulty:3,time:"1-2周",tags:["FFT","α波","神经反馈","闭环"],lv:"Lv.3",cost:"¥50"},
{id:8,title:"双通道EEG采集+BLE传输",desc:"前额叶(Fp1/Fp2)双通道EEG采集→BLE实时传输→手机/PC端显示。完成'EEG采集→无线传输→上位机'全链路。",difficulty:4,time:"2-3周",tags:["EEG","BLE","无线"],lv:"Lv.4",cost:"¥400"},
{id:9,title:"EEGNet运动想象分类(嵌入式)",desc:"Python训练EEGNet→TFLite INT8量化→xxd转C数组→STM32F4/H7实时推理→分类运动想象(左/右手)。这是验证你的BCI嵌入式系统是否'国际水平'的里程碑。",difficulty:4,time:"3-4周",tags:["EEGNet","TFLite","AI","运动想象"],lv:"Lv.5",cost:"¥200"},
{id:10,title:"FreeRTOS多任务BCI系统",desc:"设计FreeRTOS多任务架构：采集Task(250Hz最高优先级)→处理Task(FFT+CSP)→BLE Tx Task→电源管理Task。实现完整的嵌入式BCI固件架构。",difficulty:4,time:"2-3周",tags:["FreeRTOS","多任务","架构"],lv:"Lv.4-5",cost:"¥300"},
{id:11,title:"SSVEP频率识别系统",desc:"LED以不同频率闪烁(如12/15/18/21Hz)→枕叶EEG出现对应SSVEP频率→嵌入式FFT检测最强频率→识别用户注视的目标。注意切换采样率以满足Nyquist。",difficulty:3,time:"2-3周",tags:["SSVEP","FFT","频率检测"],lv:"Lv.3-4",cost:"¥300"},
{id:12,title:"OTA固件升级系统",desc:"实现双分区OTA：Bank A(活跃固件)+Bank B(下载新固件)→CRC校验→切换启动→异常自动回滚。这是BCI产品化的必做项。",difficulty:4,time:"2周",tags:["OTA","Bootloader","可靠性"],lv:"Lv.5",cost:"¥50"},
{id:13,title:"低功耗BCI可穿戴原型",desc:"基于nRF52840设计超低功耗BCI采集器：待机<100μA、采集+BLE<15mA、钮扣电池供电>24h。学习DVFS、时钟门控、事件驱动架构。",difficulty:4,time:"3-4周",tags:["低功耗","nRF52","可穿戴"],lv:"Lv.5",cost:"¥250"},
{id:14,title:"大模型+BCI意图翻译",desc:"Raspberry Pi 5上部署轻量LLM→EEG解码的多候选意图→LLM根据上下文消歧→输出精确指令。2026年最前沿的BCI+AI融合架构。",difficulty:5,time:"4-6周",tags:["LLM","RPi5","多模态","前沿"],lv:"Lv.6",cost:"¥2000"},
{id:15,title:"多模态BCI(EEG+EMG+眼动)",desc:"同时采集EEG(OpenBCI 8ch)+EMG(额肌+咬肌)+眼电→嵌入式多模态融合→更高准确率的意图解码。多传感器同步是关键工程挑战。",difficulty:5,time:"4-6周",tags:["多模态","融合","同步"],lv:"Lv.5-6",cost:"¥5000"}
];
