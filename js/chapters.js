// BCI Learning Hub - Chapter Data v1.0.0
const CHAPTERS = [
{ // Ch1
  id:1, title:"全球最前沿BCI技术架构详解", slug:"ch01",
  summary:"拆解Neuralink N1、OpenBCI Cyton/Ganglion、Blindsight、Synchron Stentrode、博睿康NEO等全球最先进BCI系统的嵌入式架构，理解"天花板"在哪里",
  tags:["架构拆解","前沿","入门必读"], difficulty:1, hours:"2-3h",
  content:`<h2>1.1 Neuralink N1 芯片架构（2026年最先进侵入式BCI）</h2>
<pre><code>┌─────────────────────────────────────────────────────┐
│                  Neuralink N1                        │
├──────────────┬──────────────────┬───────────────────┤
│  神经探针层  │    芯片处理层     │    无线通信层      │
│ (1024通道)   │   (定制的ASIC)   │    (NFC/BLE)      │
├──────────────┼──────────────────┼───────────────────┤
│ 64根threads  │ 1024ch 放大器    │  NFC 无线充电      │
│ 每根16电极   │ ΔΣ ADC 10bit    │  蓝牙5.0 数据TX    │
│ 柔性聚合物   │ Spike检测(硬件)  │  OTA固件升级        │
│ 线电极 φ5μm  │ 神经编码器 ASIC  │  封装钛合金         │
└──────────────┴──────────────────┴───────────────────┘</code></pre>

<p><strong>核心技术参数：</strong></p>
<ul>
<li><strong>通道数</strong>：1024电极（64根threads × 16电极/根）</li>
<li><strong>信号类型</strong>：Spike（单神经元峰电位）→ 实时spike检测与排序</li>
<li><strong>采样率</strong>：约20kHz/通道</li>
<li><strong>数据压缩比</strong>：硬件级spike检测降数据量约100:1</li>
<li><strong>无线方案</strong>：NFC下行（充电+配置），蓝牙上行（数据）</li>
<li><strong>第4代芯片</strong>：三星4nm工艺，代号"O1"，从"只读取"升级为"双向通信"</li>
</ul>

<div class="note"><strong>嵌入式技术拆解——我们能学的：</strong><br>
1. <strong>硬件spike检测</strong>：嵌入式端实时检测神经元放电事件<br>
2. <strong>OTA升级</strong>：BCI设备必须支持空中固件更新<br>
3. <strong>低功耗无线</strong>：NFC+BLE双模，传输功率<10mW<br>
4. <strong>垂直整合</strong>：芯片设计→探针制造→手术机器人→算法→固件</div>

<h2>1.2 OpenBCI Cyton 架构</h2>
<pre><code>┌───────────────────────────────────────────────────┐
│              OpenBCI Cyton Board                    │
├──────────────┬──────────────────┬──────────────────┤
│   模拟前端    │    MCU处理器      │    通信模块       │
│ ADS1299 x1  │ PIC32MX250F128B  │ RFduino BLE       │
│ 8ch 24bit   │ 50MHz MIPS       │ 250-1000 SPS      │
│ ΔΣ ADC      │ 128KB Flash      │ USB/蓝牙双模      │
│ PGA 1-24x   │ 32KB RAM         │ SD卡日志          │
└──────────────┴──────────────────┴──────────────────┘</code></pre>
<p>ADS1299是TI专为EEG设计的8通道24位ΔΣ ADC，含PGA、偏置驱动、右腿驱动、Lead-off检测——这是BCI模拟前端的设计标杆。</p>

<h2>1.3 Neuralink Blindsight（视觉恢复BCI）</h2>
<p>外置摄像头→实时视觉处理引擎→电刺激模式生成器→视觉皮层微电极阵列→患者"看到"低分辨率视觉图像。关键挑战：延迟<100ms、µs级时序精度、神经适应。</p>

<h2>1.4 其他前沿架构</h2>
<table><tr><th>系统</th><th>路线</th><th>通道</th><th>关键差异</th></tr>
<tr><td>Neuralink N1</td><td>侵入式·皮层</td><td>1024</td><td>最高通道数，硬件spike检测</td></tr>
<tr><td>OpenBCI Cyton</td><td>非侵入式·开源</td><td>8/16</td><td>ADS1299+PIC32，开源生态最大</td></tr>
<tr><td>博睿康NEO</td><td>侵入式·硬膜外</td><td>128</td><td>全球首款获批侵入式BCI(NMPA)</td></tr>
<tr><td>Synchron Stentrode</td><td>血管内微创</td><td>16</td><td>无需开颅，信号质量需更强算法</td></tr>
<tr><td>中国128ch全植入</td><td>侵入式·全植入</td><td>128</td><td>柔性电极+无线充电，11家医院临床</td></tr></table>`,
  faq:[{q:"Neuralink N1芯片为什么用10bit ADC而非24bit？",a:"侵入式Spike信号幅值大(10-500μV)，不需要24bit精度。10bit在±1mV范围分辨率约2μV，对于spike检测足够。降低ADC精度可大幅降低功耗和芯片面积。"},{q:"OpenBCI为什么选PIC32而不是STM32？",a:"历史原因+社区惯性。PIC32在OpenBCI创立时(2013)性价比较好。但从技术角度看，STM32F4/H7的DSP能力更强，现在的BCI嵌入式设计推荐STM32系列。"},{q:"硬膜外植入和皮层植入有什么区别？",a:"硬膜外（博睿康NEO）电极在硬膜外，不穿透脑组织，更安全但信号略弱。皮层植入（Neuralink）电极插入皮层，信号最强但需穿透脑组织。两种路线各有优劣。"}],
  xrefs:[2,3,12]
},
{ // Ch2
  id:2, title:"BCI嵌入式需要掌握的核心技能", slug:"ch02",
  summary:"按P0/P1/P2三个优先级排列BCI嵌入式工程师必备技能：C语言、MCU架构、ADC、DSP、BLE、低功耗、边缘AI等",
  tags:["技能矩阵","核心必读","P0-P2"], difficulty:1, hours:"1-2h",
  content:`<h2>P0：必备基础（没有这些寸步难行）</h2>
<table><tr><th>技能</th><th>原因</th><th>参考实现</th></tr>
<tr><td><strong>C语言</strong></td><td>嵌入式开发的根基</td><td>OpenBCI固件全部C/C++</td></tr>
<tr><td><strong>MCU架构（ARM Cortex-M）</strong></td><td>95%的BCI嵌入式设备基于M系列</td><td>Neuralink N1含ARM核心</td></tr>
<tr><td><strong>ADC + 模拟前端</strong></td><td>BCI本质是"高性能生物电ADC"</td><td>ADS1299/RHD2000驱动</td></tr>
<tr><td><strong>DMA</strong></td><td>连续AD采集不丢数据</td><td>双缓冲DMA是标配</td></tr>
<tr><td><strong>FreeRTOS/uC-OS III</strong></td><td>多任务：采集+处理+通信+UI</td><td>闭环BCI需要RTOS</td></tr></table>

<h2>P1：BCI专用（与通用嵌入式工程师拉开差距）</h2>
<table><tr><th>技能</th><th>原因</th><th>前沿水平参考</th></tr>
<tr><td><strong>ΔΣ ADC原理</strong></td><td>EEG信号<100μV需要高精度</td><td>ADS1299 24bit 输入噪声<1μVpp</td></tr>
<tr><td><strong>生物电信号链设计</strong></td><td>仪表放大器→滤波→ADC→隔离</td><td>AD8232/ADS1299/Intan RHD2000</td></tr>
<tr><td><strong>CMSIS-DSP优化</strong></td><td>ARM官方DSP库，MCU上跑FFT比手写快4x</td><td>FFT 1024点@72MHz≈2ms</td></tr>
<tr><td><strong>CMSIS-NN/TFLite Micro</strong></td><td>嵌入式端神经网络推理</td><td>STM32F4@168MHz: 推理100μs/样本</td></tr>
<tr><td><strong>低功耗设计</strong></td><td>植入式设备必须<50mW散热</td><td>待机<1μA，运行时<15mA</td></tr></table>

<h2>P2：前沿方向（1年+经验后逐步进入）</h2>
<table><tr><th>技能</th><th>前沿成果参考</th></tr>
<tr><td><strong>边缘AI推理优化</strong></td><td>TFLite Micro + INT8量化，模型<50KB</td></tr>
<tr><td><strong>FPGA高速信号处理</strong></td><td>Xilinx Zynq + Intan RHD2000</td></tr>
<tr><td><strong>嵌入式OTA</strong></td><td>Neuralink已实现特斯拉式OTA</td></tr>
<tr><td><strong>硬件spike detection</strong></td><td>模拟比较器+定时器窗口</td></tr>
<tr><td><strong>植入式无线充电</strong></td><td>NFC/Qi，热管理<1°C温升</td></tr></table>

<div class="tip"><strong>Neuralink联创DJ Seo明确表示</strong>：最紧缺人才是软件/固件工程师和AI数据标注专家，<strong>不要求神经科学背景</strong>。嵌入式工程师是这个行业最缺的人。</div>`,
  faq:[{q:"没有神经科学背景能入局BCI嵌入式吗？",a:"完全可以。Neuralink联创DJ Seo明确说最缺嵌入式/固件工程师，不要求神经科学背景。你需要的是嵌入式功底（C语言、MCU、ADC、DSP），神经科学知识可以边做边学。"},{q:"P0和P1的分界线是什么？",a:"P0是通用嵌入式工程师的基本功（C/MCU/外设/RTOS），P1是BCI领域专有技能（ΔΣ ADC、生物电信号链、CMSIS-DSP、TFLite Micro）。掌握P1才能从普通嵌入式工程师升级为BCI嵌入式工程师。"}],
  xrefs:[1,4,13]
},
{ // Ch3
  id:3, title:"BCI信号处理全链路（从电极到分类）", slug:"ch03",
  summary:"完整拆解EEG信号处理链路：电极→仪表放大器→PGA→抗混叠滤波→ΔΣ ADC→数字滤波→特征提取→分类→控制输出",
  tags:["信号处理","基础理论","EEG频段"], difficulty:2, hours:"2-3h",
  content:`<h2>3.1 BCI信号处理全链路</h2>
<pre><code>电极→仪表放大器→PGA→抗混叠滤波→ΔΣ ADC→数字滤波→特征提取→分类→控制
    ↑          ↑         ↑          ↑         ↑          ↑          ↑     ↑
  头皮/皮层   AD8232   ADS1299   RC LPF  24bit ADC   FIR/IIR   FFT/PSD  SVM/CNN
  银/AgCl   CMRR>90dB 增益1-24x fc=500Hz ΔΣmodulator ICA去伪迹CSP/小波意图输出</code></pre>

<h2>3.2 脑电信号频段对照表（EEG新手必记）</h2>
<table><tr><th>频段</th><th>符号</th><th>频率范围</th><th>典型幅值</th><th>出现场景</th></tr>
<tr><td>δ波</td><td>Delta</td><td>0.5-4 Hz</td><td>20-200 μV</td><td>深度睡眠，婴儿</td></tr>
<tr><td>θ波</td><td>Theta</td><td>4-8 Hz</td><td>10-50 μV</td><td>困倦，冥想</td></tr>
<tr><td>α波</td><td>Alpha</td><td>8-13 Hz</td><td>10-50 μV</td><td>闭眼放松，枕叶最强</td></tr>
<tr><td>β波</td><td>Beta</td><td>13-30 Hz</td><td>5-20 μV</td><td>活跃思考，警觉</td></tr>
<tr><td>γ波</td><td>Gamma</td><td>30-100 Hz</td><td>&lt;5 μV</td><td>高级认知，意识活动</td></tr>
<tr><td>μ节律</td><td>mu</td><td>8-12 Hz</td><td>10-50 μV</td><td>运动皮层，想象运动时减弱(ERD)</td></tr></table>

<h2>3.3 关键物理常数（设计ADC时必须知道）</h2>
<table><tr><th>信号类型</th><th>幅值范围</th><th>重要性</th></tr>
<tr><td>头皮EEG</td><td>1-100 μV 峰值（典型10-50 μV）</td><td>⭐⭐⭐⭐⭐</td></tr>
<tr><td>ECoG（皮层电图）</td><td>50-500 μV</td><td>⭐⭐⭐⭐</td></tr>
<tr><td>Spike（单神经元放电）</td><td>10-500 μV</td><td>⭐⭐⭐⭐</td></tr>
<tr><td>眼电伪迹（EOG）</td><td>100-5000 μV（比EEG大100倍！）</td><td>必须去除</td></tr>
<tr><td>工频干扰</td><td>50/60Hz，幅值可达EEG的100倍</td><td>必须抑制</td></tr>
<tr><td>ADC噪声要求</td><td>输入参考噪声需<1μVpp</td><td>ADS1299典型0.8μVpp</td></tr></table>

<h2>3.4 国际BCI竞赛当前最优结果</h2>
<table><tr><th>任务</th><th>数据集</th><th>当前最优</th><th>方法</th><th>年份</th></tr>
<tr><td>4分类运动想象</td><td>BCI Competition IV-2a</td><td>86.2%</td><td>FBCSP+EEGNet</td><td>2025</td></tr>
<tr><td>2分类运动想象</td><td>BCI Competition IV-2b</td><td>93.5%</td><td>Spectral Transformer</td><td>2026</td></tr>
<tr><td>P300拼写器</td><td>BCI Competition III</td><td>97.8%</td><td>CNN + 集成学习</td><td>2025</td></tr></table>

<div class="tip"><strong>自测基准</strong>：嵌入式BCI系统跑EEGNet（约6000参数，12KB Flash），在MI-2a上达到>80%准确率=国际水平，>85%=优秀。</div>`,
  faq:[{q:"为什么EEG信号这么微弱却能被检测到？",a:"靠差分放大+高CMRR。ADS1299的CMRR>110dB，意味着共模噪声（如50Hz工频）被抑制10万倍以上，而差模EEG信号被放大。关键是用右腿驱动(DRL)反馈进一步抑制共模。"},{q:"为什么采样率250Hz就够了？",a:"EEG有用信号主要<100Hz（Nyquist频率=125Hz），250Hz采样率是实际折中选择。侵入式Spike信号需要20kHz+采样率（Spike宽度约1ms）。"}],
  xrefs:[2,4,10]
},
{ // Ch4
  id:4, title:"发展阶段——分6级从入门到专家", slug:"ch04",
  summary:"从Lv.0到Lv.6的系统学习路径：环境搭建→基本外设→ADC+DMA→数字信号处理→BCI全链路→边缘AI+闭环BCI→前沿BCI系统设计",
  tags:["学习路径","分级","项目驱动"], difficulty:1, hours:"1.5-2h",
  content:`<h2>Lv.0：环境搭建 + C语言（1-2周）</h2>
<p>安装ARM GCC、CMake、Make、OpenOCD → 编译第一个STM32工程 → 点亮LED</p>

<h2>Lv.1：基本外设 + 裸机开发（1-2月）</h2>
<p><strong>项目成果</strong>：LED流水灯、串口Hello World、按键中断、定时器PWM</p>
<p><strong>对标国际</strong>：OpenBCI Ganglion固件开发入门</p>
<p><strong>开发板</strong>：STM32F103C8T6 (¥10-15) + ST-Link V2 (¥15-25)</p>

<h2>Lv.2：ADC + DMA + 信号基础（2-3月）</h2>
<p><strong>项目成果</strong>：ADC连续采样→DMA双缓冲→OLED实时显示波形</p>
<p><strong>核心能力</strong>：计算合适采样率（EEG 250Hz=4ms间隔）、设计抗混叠滤波器（RC LPF fc=1/(2πRC)）、数据帧格式设计</p>
<p><strong>开发板</strong>：STM32F407VET6 (¥30-60) + AD8232 (¥15-25)</p>

<h2>Lv.3：数字信号处理 + CMSIS-DSP（3-5月）</h2>
<p><strong>项目成果</strong>：MCU上实时FFT → 频谱显示/滤波 → 特征提取</p>
<p><strong>前沿参考</strong>：CMSIS-DSP 1024点FFT@168MHz~1ms；CMSIS-NN推理EEGNet~100-500μs</p>
<p><strong>练手项目</strong>：50Hz陷波FIR滤波器、实时α波功率检测→LED指示闭眼、CMSIS-NN推理EEG分类模型</p>

<h2>Lv.4：BCI全链路（5-8月）</h2>
<p><strong>对标OpenBCI完整方案</strong>：电极→输入保护→ADS1299 8ch PGA@24x→24bit ΔΣ ADC@250SPS→PIC32MX SPI读取→BLE封包→RFduino无线TX→上位机接收→带通滤波→ICA去眼电→CSP/LDA→分类输出</p>

<h2>Lv.5：边缘AI + 闭环BCI（8-12月）</h2>
<p><strong>EEGNet微型网络</strong>：参数量约6,000（INT8量化后<12KB），RAM<10KB，推理<500μs @STM32F4，准确率~80%(4分类)/~91%(2分类)</p>
<p><strong>练手项目</strong>：Python训练EEGNet→TFLite INT8量化→xxd转C数组→MCU推理；实时运动想象闭环；OTA升级</p>

<h2>Lv.6：前沿BCI系统设计（1年+）</h2>
<p><strong>五大方向</strong>：A.大模型+BCI协同 B.侵入式信号处理 C.多模态BCI D.柔性电子+可穿戴BCI E.ASIC+FPGA定制</p>`,
  faq:[{q:"6个月能达到什么水平？",a:"能独立搭建8通道非侵入式BCI原型（¥500-1000成本），能用EEGNet在MCU上实现实时运动想象分类（>75%准确率），掌握ADS1299/AD8232等AFE驱动开发，会BLE/WiFi无线传输+配套上位机。"},{q:"从哪个级别开始做BCI专用项目？",a:"Lv.2开始接触模拟前端（AD8232心电），Lv.3做数字信号处理（FFT/滤波器），Lv.4跑通完整BCI全链路。建议Lv.0-1快速过（2周），重点在Lv.2-4（核心BCI能力建设）。"}],
  xrefs:[2,5,7]
},
{ // Ch5
  id:5, title:"完整硬件装备清单与选型指南", slug:"ch05",
  summary:"4阶段硬件决策树：¥150封顶入门→¥200-1500信号采集→¥1500-6000 BCI专用→¥600+前沿实验。含快速决策树和AFE芯片对比",
  tags:["硬件选型","采购清单","预算"], difficulty:1, hours:"1-2h",
  content:`<h2>5.1 快速决策树</h2>
<pre><code>你是嵌入式新手？
  ↓是 → 阶段A（¥150封顶）
  ↓否
你想做实时EEG采集？
  ↓是 → 你需要AFE芯片
  ↓否
你的目标？
  ┌─ 消费级快速体验 → Muse 2 (¥1800)
  ├─ 开源完整方案 → OpenBCI Cyton (¥3600)
  ├─ 低功耗可穿戴 → nRF52840 + AD8232 (¥250)
  ├─ 边缘AI推理 → RPi5 / Jetson Nano (¥400-800)
  └─ 高速实时采集 → STM32H7 + Zynq FPGA (¥300-600)</code></pre>

<h2>5.2 阶段A：嵌入式入门装备（¥150封顶）</h2>
<table><tr><th>设备</th><th>型号</th><th>价格</th><th>优先级</th></tr>
<tr><td>主控</td><td>STM32F103C8T6最小系统板</td><td>¥10-15</td><td>★★★★★</td></tr>
<tr><td>调试器</td><td>ST-Link V2</td><td>¥15-25</td><td>★★★★★</td></tr>
<tr><td>显示屏</td><td>0.96寸OLED I2C(SSD1306)</td><td>¥5-8</td><td>★★★★</td></tr>
<tr><td>逻辑分析仪</td><td>24MHz 8CH</td><td>¥15</td><td>★★★★★</td></tr>
<tr><td colspan="3"><strong>总计</strong></td><td><strong>¥105-125</strong></td></tr></table>

<h2>5.3 BCI专用AFE芯片对比</h2>
<table><tr><th>芯片</th><th>通道</th><th>分辨率</th><th>噪声</th><th>功耗</th><th>价格</th><th>应用</th></tr>
<tr><td><strong>TI ADS1299</strong></td><td>8</td><td>24bit</td><td>1μVpp</td><td>5mW/ch</td><td>¥40-80</td><td>EEG行业标准</td></tr>
<tr><td><strong>Intan RHD2000</strong></td><td>16-64</td><td>16bit</td><td>2.4μVrms</td><td>0.6mW/32ch</td><td>¥100-200</td><td>侵入式/非侵入式</td></tr>
<tr><td>Maxim MAX30003</td><td>1</td><td>24bit</td><td>1μVpp</td><td>100μW</td><td>¥30-50</td><td>ECG/EMG超低功耗</td></tr>
<tr><td>ADI AD8232</td><td>1</td><td>-</td><td>10μVpp</td><td>0.5mW</td><td>¥15-25</td><td>ECG/EMG入门</td></tr></table>

<div class="tip"><strong>选型要诀</strong>：非侵入式EEG→<strong>ADS1299</strong>；侵入式Spike/LFP→<strong>Intan RHD2000</strong>；消费级可穿戴→<strong>MAX30003</strong>；新手练手→<strong>AD8232</strong>(¥15入手)</div>`,
  faq:[{q:"¥500能做出BCI原型吗？",a:"可以。配置：ADS1299EEG-FE评估板(¥350)+STM32F407(¥65)+ST-Link V3(¥85)=¥500。这是8通道EEG采集原型的最低成本。如果只做双通道心电/肌电练习，¥80就够了(AD8232+STM32F103)。"}],
  xrefs:[4,6,14]
},
{ // Ch6
  id:6, title:"软件工具链（2026年推荐版）", slug:"ch06",
  summary:"嵌入式端：STM32CubeIDE/VS Code、ARM GCC 14.2、CMSIS-DSP 5.9、TFLite Micro 4.0、FreeRTOS；Python端：MNE-Python、MOABB、OpenBCI Python",
  tags:["工具链","IDE","Python"], difficulty:1, hours:"1h",
  content:`<h2>6.1 核心嵌入式工具</h2>
<table><tr><th>类别</th><th>推荐</th><th>说明</th></tr>
<tr><td><strong>IDE</strong></td><td>STM32CubeIDE / VS Code+EIDE</td><td>官方免费 + 轻量替代</td></tr>
<tr><td><strong>编译器</strong></td><td>ARM GCC 14.2</td><td>免费，支持所有Cortex-M</td></tr>
<tr><td><strong>构建</strong></td><td>CMake 4.3</td><td>跨平台构建</td></tr>
<tr><td><strong>调试</strong></td><td>OpenOCD + GDB</td><td>开源调试</td></tr>
<tr><td><strong>DSP库</strong></td><td><strong>CMSIS-DSP 5.9</strong></td><td>ARM官方优化，FFT比手写快4x</td></tr>
<tr><td><strong>NN推理</strong></td><td><strong>TFLite Micro 4.0</strong>/CMSIS-NN</td><td>嵌入式端神经网络</td></tr>
<tr><td><strong>RTOS</strong></td><td>FreeRTOS / μT-Kernel</td><td>多任务</td></tr></table>

<h2>6.2 Python端工具链</h2>
<table><tr><th>分类</th><th>库</th><th>用途</th></tr>
<tr><td><strong>BCI全栈(必装)</strong></td><td><strong>MNE-Python 1.8</strong></td><td>EEG/ECoG分析业界标准，ICA/PSD/时频</td></tr>
<tr><td>科学计算</td><td>NumPy / SciPy</td><td>信号处理基础</td></tr>
<tr><td>深度学习</td><td>TensorFlow 2.18</td><td>训练→TFLite→MCU部署</td></tr>
<tr><td><strong>BCI算法(必装)</strong></td><td><strong>MOABB</strong></td><td>标准BCI基准测试框架</td></tr>
<tr><td>信号采集</td><td>OpenBCI Python 1.0</td><td>OpenBCI设备驱动</td></tr></table>

<h2>6.3 学习资源</h2>
<table><tr><th>资源</th><th>类型</th><th>说明</th></tr>
<tr><td><strong>OpenBCI Documentation</strong></td><td>官方文档</td><td>硬件+固件+软件全套</td></tr>
<tr><td><strong>MNE-Python Tutorials</strong></td><td>教程</td><td>EEG分析标准教程</td></tr>
<tr><td><strong>EEGNet论文</strong></td><td>论文</td><td>紧凑CNN，适合MCU部署</td></tr>
<tr><td><strong>CMSIS-DSP手册</strong></td><td>参考</td><td>FFT/滤波/矩阵在MCU上实现</td></tr>
<tr><td><strong>Spectral Transformer</strong></td><td>论文</td><td>2026年最新MI BCI方法</td></tr></table>`,
  faq:[{q:"为什么推荐CMSIS-DSP而不是手写DSP？",a:"CMSIS-DSP是ARM官方优化的汇编级函数库，在Cortex-M上FFT比手写快3-5x。对于BCI这种对实时性要求极高的应用，没有理由不用。手写DSP不仅是重复造轮子，而且性能远不如。"}],
  xrefs:[2,4,13]
},
{ // Ch7
  id:7, title:"6个月快速行动路线图", slug:"ch07",
  summary:"24周从零到能独立搭建完整非侵入式BCI原型的分周计划：每2周一个里程碑，含具体任务清单和考核标准",
  tags:["行动路线","6个月","里程碑"], difficulty:1, hours:"1h",
  content:`<h2>7.1 第1-2周：环境搭建 + C语言热身</h2>
<ul><li>✅ ARM GCC + CMake + Make + OpenOCD 安装测试</li><li>✅ STM32最小系统板+ST-Link+LED点亮</li><li>✅ C语言回顾：指针、位操作、结构体、函数指针</li></ul>

<h2>7.2 第3-4周：基础外设</h2>
<ul><li>✅ GPIO：LED流水灯 + 按键轮询/中断 + 软件消抖</li><li>✅ UART：printf重定向 + 中断接收 + 简单命令解析</li><li>✅ TIM：定时器PWM调LED亮度</li><li>✅ I2C：驱动SSD1306 OLED显示</li></ul>

<h2>7.3 第5-6周：ADC + DMA</h2>
<ul><li>✅ 单通道ADC轮询采集电位器 → 串口打印</li><li>✅ ADC + TIM触发 + DMA连续采集 → 双缓冲切换</li><li>✅ Python串口接收+Matplotlib实时绘图</li></ul>

<h2>7.4 第7-8周：BCI信号链入门</h2>
<ul><li>✅ 理解ADS1299数据手册：寄存器映射、SPI协议</li><li>✅ AD8232心电模块采集ECG → ADC+DMA → PC显示</li><li>✅ PC上用MNE-Python做ECG预处理：滤波+ICA+PSD</li><li>✅ <strong>小突破</strong>：完成"生物电信号→嵌入式采集→PC处理"全链路</li></ul>

<h2>7.5 第9-12周：EEG专项</h2>
<ul><li>✅ BCI Competition IV-2a：带通滤波8-30Hz→CSP→LDA分类</li><li>✅ 读EEGNet论文→PyTorch/TF复现→训练模型</li><li>✅ 模型量化：TF训练→TFLite INT8→xxd转C数组</li></ul>

<h2>7.6 第13-16周：嵌入式实时处理</h2>
<ul><li>✅ CMSIS-DSP：MCU上1024点FFT < 5ms</li><li>✅ TF Lite Micro移植到STM32H7/nRF52</li><li>✅ <strong>关键里程碑</strong>：MCU上跑通"ADC采集→FFT→CSP→EEGNet推理→输出"</li></ul>

<h2>7.7 第17-20周：无线BCI原型</h2>
<ul><li>✅ BLE移植（nRF52840 SDK或ESP-IDF NimBLE）</li><li>✅ 双通道EEG采集 → BLE实时传输 → PC接收显示</li><li>✅ FreeRTOS多任务架构：采集Task + 处理Task + BLE Tx Task</li></ul>

<h2>7.8 第21-24周：闭环项目</h2>
<ul><li>✅ <strong>闭环BCI</strong>：EEG α波增强检测→实时反馈(LED/蜂鸣器)</li><li>✅ <strong>运动想象原型</strong>：想象左/右手→FFT+CSP+TFLM→LED指示</li><li>✅ 性能基准评估：延迟<300ms，准确率>75%</li></ul>

<h2>6个月后达到的水平</h2>
<ul><li>能独立搭建8通道非侵入式BCI原型（¥500-1000成本）</li><li>能用EEGNet在MCU上实现实时运动想象分类（>75%准确率）</li><li>掌握ADS1299/AD8232等AFE芯片驱动开发</li><li>会BLE/WiFi无线传输+配套PC/手机端显示</li><li>理解侵入式BCI架构原理，具备独立深钻能力</li></ul>`,
  faq:[{q:"6个月时间够吗？需要全职吗？",a:"6个月是兼职（每周15-20小时）的估计。如果有嵌入式基础（C+MCU），可以跳过第1-4周，约4-5个月完成。全职学习（每周40h）可以在2-3个月内完成。"},{q:"最关键的里程碑是哪个？",a:"第13-16周的'MCU上跑通EEGNet推理'是质变点。在此之前你是在搭积木，在此之后你拥有了一个完整的BCI嵌入式推理系统，可以在此基础上做任何创新。"}],
  xrefs:[4,5,8]
},
{ // Ch8
  id:8, title:"BCI国际前沿参考清单（2026年）", slug:"ch08",
  summary:"2026年BCI行业全景：Neuralink、博睿康、Synchron、强脑科技等产品对比，十大关键数据，市场融资动态",
  tags:["行业动态","前沿","2026"], difficulty:1, hours:"1h",
  content:`<h2>8.1 已商业化/即将商业化的BCI产品</h2>
<table><tr><th>产品</th><th>公司</th><th>类型</th><th>状态</th><th>通道</th><th>价格/融资</th></tr>
<tr><td>NEO</td><td>博睿康</td><td>侵入式·硬膜外</td><td><strong>已获批(NMPA)</strong></td><td>128</td><td>IPO科创板受理</td></tr>
<tr><td>Telepathy</td><td>Neuralink</td><td>侵入式·皮层</td><td>FDA临床试验</td><td>1024</td><td>量产中</td></tr>
<tr><td>Blindsight</td><td>Neuralink</td><td>侵入式·视觉皮层</td><td>FDA突破性认定</td><td>1024+</td><td>临床前</td></tr>
<tr><td>Stentrode</td><td>Synchron</td><td>血管内微创</td><td>FDA临床试验</td><td>16</td><td>D轮$2亿</td></tr>
<tr><td>Muse 2</td><td>Interaxon</td><td>非侵入式</td><td>已上市</td><td>4</td><td>¥1800</td></tr>
<tr><td>OpenBCI Cyton</td><td>OpenBCI</td><td>非侵入式·开源</td><td>已上市</td><td>8/16</td><td>¥3600</td></tr></table>

<h2>8.2 2026年BCI行业十大关键数据</h2>
<table><tr><th>指标</th><th>数据</th><th>来源</th></tr>
<tr><td>全球BCI市场规模(2026)</td><td>~29.5-33亿美元</td><td>产业报告</td></tr>
<tr><td>中国Q1融资总额</td><td>超38亿元(17起)</td><td>新闻汇总</td></tr>
<tr><td>Neuralink患者数</td><td>20+</td><td>Neuralink官方</td></tr>
<tr><td>博睿康临床手术</td><td>36例</td><td>招股书</td></tr>
<tr><td>全球侵入式获批</td><td><strong>1个</strong>(博睿康NEO)</td><td>NMPA 2026.03.13</td></tr>
<tr><td>博睿康2025营收</td><td>1.08亿元(首破亿)</td><td>招股书</td></tr>
<tr><td>Neuralink 4nm芯片</td><td>三星代工，2026试产</td><td>2026.06.16新闻</td></tr>
</table>

<div class="note"><strong>三重共振</strong>：技术突破(Neuralink 20+患者)+产品获批(博睿康NEO)+资本涌入(中国Q1超38亿)+政策加持(政府工作报告首次列入六大未来产业)</div>`,
  faq:[{q:"为什么博睿康NEO是全球首个获批的侵入式BCI？",a:"中国NMPA的审批路径与美国FDA不同。博睿康NEO采用硬膜外植入（不穿透脑组织），安全性更高，审批门槛相对较低。Neuralink的皮层植入FDA审批周期更长。但这不代表技术优劣——只是监管路径差异。"},{q:"2026年入局BCI的最佳切入点是什么？",a:"非侵入式嵌入式BCI工程师——即用ADS1299+STM32搭建EEG采集系统+边缘AI推理。这个方向需求最大，入门门槛最低（不需要医疗资质），且能对接所有BCI企业（从消费级到侵入式都需要嵌入式人才）。"}],
  xrefs:[1,15]
},
{ // Ch9
  id:9, title:"BCI嵌入式系统实时性深度工程分析", slug:"ch09",
  summary:"延迟是BCI系统的核心指标。详解人类神经传导延迟基准、系统延迟分解模型、延迟优化技术对比、闭环BCI实时性设计实例",
  tags:["实时性","延迟","工程实践"], difficulty:3, hours:"2-3h",
  content:`<h2>9.1 人类神经传导延迟基准表</h2>
<table><tr><th>神经通路</th><th>传导速度</th><th>端到端延迟</th><th>BCI目标</th></tr>
<tr><td>运动皮层→脊髓→肌肉</td><td>50-80 m/s</td><td><strong>150-200ms</strong></td><td><100ms ✅</td></tr>
<tr><td>触感反馈（皮肤→皮层）</td><td>30-60 m/s</td><td><strong>50-100ms</strong></td><td><50ms ✅</td></tr>
<tr><td>视觉感知（光→视皮层）</td><td>—</td><td><strong>80-100ms</strong></td><td><80ms ✅</td></tr>
</table>

<div class="tip"><strong>2025-12-17中国团队突破</strong>：通过自定义通信协议，将BCI系统端到端延迟压缩至<strong>100ms以内</strong>，低于生理延迟，患者控制体验流畅自然。</div>

<h2>9.2 BCI系统延迟分解模型（8通道EEG，250Hz）</h2>
<pre><code>总延迟 = t_acq + t_trans + t_proc + t_transmit + t_display

t_acq:         4ms     （1个采样间隔，250Hz=4ms/样本）
t_trans:       1-2ms   （SPI @2MHz）
t_proc:        5-50ms  （FFT 1024点≈2ms；CSP+LDA≈1ms；EEGNet TFLM≈0.5ms）
t_transmit:    10-30ms （BLE连接间隔+从设备延时+MTU协商）
t_display:     16.7ms  （OLED 60Hz刷新）

总延迟典型范围：30-100ms</code></pre>

<h2>9.3 嵌入式延迟优化技术对比</h2>
<table><tr><th>手段</th><th>效果</th><th>代价</th><th>推荐</th></tr>
<tr><td><strong>BLE最小连接间隔(7.5ms)</strong></td><td>降低t_transmit</td><td>功耗增加</td><td>★★★★★</td></tr>
<tr><td><strong>本地推理（不传PC）</strong></td><td>消除t_transmit+t_proc</td><td>MCU算力要求高</td><td>★★★★★</td></tr>
<tr><td><strong>DMA双缓冲</strong></td><td>消除传输等待</td><td>固件复杂度↑</td><td>★★★★★</td></tr>
<tr><td><strong>CMSIS-DSP硬件加速</strong></td><td>t_proc降低3-5x</td><td>需学习CMSIS</td><td>★★★★</td></tr>
<tr><td><strong>INT8量化模型</strong></td><td>t_proc降低2-3x</td><td>准确率略降1-2%</td><td>★★★★</td></tr></table>

<div class="warn"><strong>关键原则</strong>：闭环反馈延迟必须<300ms，否则用户无法建立"意念→反馈"的因果关联。这是BCI实用化最硬的约束条件。</div>`,
  faq:[{q:"为什么本地推理比传PC快？",a:"BLE传输每个数据包有连接间隔延迟（最小7.5ms）+ 从设备延时 + MTU协商。对于8通道250Hz的数据，无线传输一帧数据至少10-30ms。而MCU本地推理EEGNet只需<500μs。本地推理消除了整个无线传输链路延迟。"},{q:"提升采样率会降低延迟吗？",a:"会小幅降低t_acq（采样间隔变短），但t_proc会变大（处理更多数据）。需要在采样率和处理时间之间权衡。对于运动想象BCI，250Hz已是性价比最优选择。"}],
  xrefs:[4,13,18]
},
{ // Ch10
  id:10, title:"EEG电极系统与信号完整性深度设计", slug:"ch10",
  summary:"国际10-20电极系统、参考电极方案对比（单极/平均/双极/CMS-DRL）、电极类型与接口参数、PCB设计检查清单",
  tags:["电极","信号完整性","PCB"], difficulty:3, hours:"2-3h",
  content:`<h2>10.1 国际10-20电极放置系统</h2>
<pre><code>          Fpz          Fpz = 额极中线
     Fp1  Fp2        Fp1-2 = 左右额极（前额叶，专注度）
   F7  F3  Fz  F4  F8   F3-4 = 左/右额区
   T7  C3  Cz  C4  T8   C3-4 = 左右中央区（MI核心位置）
   CP3 CP1 CPz CP2 CP4  CP=中央后回（体感）
   P7  P3  Pz  P4  P8   P3-4 = 左右顶叶（注意力）
    O1      Oz      O2   O1-2 = 左右枕叶（SSVEP核心）</code></pre>
<p><strong>新手黄金位置</strong>：C3/C4（运动想象最佳）+ Oz（SSVEP最佳）+ Fp1/Fp2（专注度/α波）</p>

<h2>10.2 参考电极方案对比</h2>
<table><tr><th>方案</th><th>原理</th><th>优点</th><th>缺点</th></tr>
<tr><td><strong>单极参考</strong></td><td>所有通道以同一参考为基准</td><td>最简单</td><td>参考噪声影响所有通道</td></tr>
<tr><td><strong>平均参考</strong></td><td>所有通道均值作为参考</td><td>消除参考位置偏差</td><td>需全部通道数据</td></tr>
<tr><td><strong>双极导联</strong></td><td>通道间差分(C3-C4)</td><td>最强共模抑制</td><td>损失绝对电位</td></tr>
<tr><td><strong>CMS/DRL（右腿驱动）</strong></td><td>共模信号反馈驱动右腿</td><td>CMRR从60→110dB+</td><td>需专用电路</td></tr></table>

<h2>10.3 信号完整性PCB设计检查清单</h2>
<table><tr><th>检查项</th><th>要求</th><th>典型错误后果</th></tr>
<tr><td><strong>模拟/数字地分割</strong></td><td>星型接地，单点桥接</td><td>数字噪声耦合→EEG SNR崩溃</td></tr>
<tr><td><strong>电源去耦</strong></td><td>每IC VDD脚：0.1μF+10μF</td><td>电源纹波→工频干扰加剧</td></tr>
<tr><td><strong>输入ESD保护</strong></td><td>ESD管≤1nA漏电流</td><td>漏电流>10nA淹没μV级EEG</td></tr>
<tr><td><strong>屏蔽</strong></td><td>电极线屏蔽层接地</td><td>50Hz工频干扰是EEG幅值的10-100x</td></tr>
</table>

<div class="warn"><strong>PCB层叠推荐</strong>：4层板最低要求。L1:模拟信号+EEG电极线(粗线>20mil)，L2:地平面(完整无分割)，L3:电源平面+数字信号，L4:地平面。整个模拟前端下方不得有数字走线！</div>`,
  faq:[{q:"干电极和湿电极应该选哪个？",a:"湿电极（Ag/AgCl+导电膏）信号质量最好但佩戴麻烦（30分钟准备）。干电极佩戴快但阻抗高（20-200kΩ vs <5kΩ）。作为工程师，设计AFE时应支持高输入阻抗（>1GΩ，如ADS1299的2GΩ）以适应干电极，同时保留湿电极选项。Muse 2使用干电极成功了——证明了干电极在消费级的可行性。"}],
  xrefs:[5,17]
},
{ // Ch11
  id:11, title:"BCI嵌入式安全与医疗合规", slug:"ch11",
  summary:"全球BCI监管现状（NMPA/FDA/CE）、IEC 60601-1医疗器械安全设计、ISO 13485质量管理体系、嵌入式工程师合规行动清单",
  tags:["安全","合规","医疗认证"], difficulty:2, hours:"1.5h",
  content:`<h2>11.1 全球BCI监管现状（2026年6月）</h2>
<table><tr><th>地区</th><th>监管机构</th><th>侵入式BCI审批</th><th>非侵入式BCI</th></tr>
<tr><td><strong>中国</strong></td><td>NMPA</td><td><strong>已批准1个</strong>（博睿康NEO）</td><td>二类医疗器械</td></tr>
<tr><td><strong>美国</strong></td><td>FDA</td><td>IDE临床试验中(Neuralink/Synchron)</td><td>SaMD监管</td></tr>
<tr><td><strong>欧盟</strong></td><td>CE MDR</td><td>III类医疗器械</td><td>IIa/IIb类</td></tr></table>

<h2>11.2 IEC 60601-1安全设计对照</h2>
<table><tr><th>安全项目</th><th>标准要求</th><th>嵌入式设计对策</th></tr>
<tr><td><strong>漏电流</strong></td><td>患者辅助电流<100μA（BF型）</td><td>光耦隔离(Si86xx)+隔离电源</td></tr>
<tr><td><strong>电介质强度</strong></td><td>1500VAC耐压1min</td><td>PCB爬电距离>4mm（加强绝缘）</td></tr>
<tr><td><strong>单一故障安全</strong></td><td>任意元件失效不造成危险</td><td>双冗余电源+独立看门狗WDT</td></tr>
<tr><td><strong>软件安全</strong></td><td>IEC 62304 Class B/C</td><td>MISRA-C+静态分析+单元测试</td></tr>
</table>

<h2>11.3 嵌入式工程师合规行动清单</h2>
<ul><li>✅ 从第一天就使用Git + 写注释 + 文档化设计决策</li><li>✅ 代码遵守MISRA-C 2012规范（PC-lint Plus检查）</li><li>✅ 核心模块单元测试覆盖率>80%（Unity+Ceedling）</li><li>✅ 每次合并前代码审查（GitHub PR / GitLab MR）</li><li>✅ 持续集成：每次提交自动编译+测试（GitHub Actions）</li></ul>`,
  faq:[{q:"做BCI原型需要关注医疗合规吗？",a:"科研原型不需要。但如果你打算创业或产品化，从第一天就遵循Git+文档+代码规范，这些习惯对医疗认证至关重要。返工的代价远超提前投入。"}],
  xrefs:[14,22]
},
{ // Ch12
  id:12, title:"侵入式BCI嵌入式特殊挑战", slug:"ch12",
  summary:"热管理（植入体温升<1°C）、无线传输穿透人体、植入体长期可靠性、双分区OTA安全设计、圣地亚哥州立大学LFP阈值自动唤醒",
  tags:["侵入式","热管理","无线","可靠性"], difficulty:4, hours:"2-3h",
  content:`<h2>12.1 热管理：最致命的工程约束</h2>
<p>植入体功耗 → 芯片发热 → 脑组织温升 → 热损伤。安全上限：<strong>脑组织温升 < 1°C</strong>，植入体连续功耗 ≤ 50-100mW。</p>

<h2>12.2 嵌入式低功耗设计技术</h2>
<table><tr><th>技术</th><th>效果</th><th>实现方式</th></tr>
<tr><td><strong>DVFS（动态电压频率调整）</strong></td><td>idle时降频50-80%</td><td>寄存器配置PLL分频</td></tr>
<tr><td><strong>时钟门控</strong></td><td>未用模块功耗归零</td><td>RCC时钟使能控制</td></tr>
<tr><td><strong>事件驱动架构</strong></td><td>无spike不传输</td><td>模拟比较器+中断触发</td></tr>
<tr><td><strong>无线充电间歇</strong></td><td>充电时暂停采集</td><td>NFC充电窗口期暂停ADC</td></tr>
<tr><td><strong>深度休眠唤醒</strong></td><td>待机<1μW</td><td>RTC+GPIO唤醒</td></tr></table>

<div class="tip"><strong>圣地亚哥州立大学LFP阈值自动唤醒（2026前沿）</strong>：通过LFP频率特征判断用户状态——睡眠时LFP慢波(0.5-4Hz)增强→芯片进入深度休眠；γ波(30-90Hz)能量上升→用户活动→唤醒芯片。比传统30s轮询模式降功耗50%，纯硬件比较器实现(<1μW)。</div>

<h2>12.3 植入式无线传输</h2>
<table><tr><th>频率范围</th><th>穿透深度</th><th>数据率</th><th>功耗</th><th>天线尺寸</th></tr>
<tr><td>LF 125kHz</td><td>极好(>20cm)</td><td><10kbps</td><td>低</td><td>大(>5cm)</td></tr>
<tr><td>NFC 13.56M</td><td>好(~10cm)</td><td>848kbps</td><td>中</td><td>中(3cm)</td></tr>
<tr><td>BLE 2.4GHz</td><td>差(<3cm)</td><td>1-2Mbps</td><td>中</td><td>小(1cm)</td></tr>
</table>

<h2>12.4 双分区OTA安全设计</h2>
<p>Flash分为Bootloader(32KB)+Bank A(256KB活跃固件)+Bank B(256KB新固件/备份)。OTA流程：下载到Bank B→CRC校验→设启动标志→复位→3天无异常后正式标记→异常则回滚到Bank A。</p>`,
  faq:[{q:"为什么植入式BCI的ADC精度比非侵入式低（10bit vs 24bit）？",a:"因为信号强度不同。侵入式spike信号幅值10-500μV，10bit在±1mV范围分辨率约2μV，对spike检测足够。非侵入式EEG只有1-50μV，需要24bit来分辨微伏级信号。另外低精度ADC功耗低得多，这对植入式至关重要。"}],
  xrefs:[1,9]
},
{ // Ch13
  id:13, title:"BCI公开数据集与基准测试完整指南", slug:"ch13",
  summary:"核心数据集详情（BCI Competition、PhysioNet、MOABB）、MOABB基准框架一键评估、性能自测基准表",
  tags:["数据集","基准测试","MOABB"], difficulty:2, hours:"1.5h",
  content:`<h2>13.1 核心数据集详情</h2>
<table><tr><th>数据集</th><th>通道</th><th>受试者</th><th>采样率</th><th>任务</th></tr>
<tr><td><strong>BCI Comp IV-2a</strong></td><td>22 EEG</td><td>9</td><td>250Hz</td><td>MI 4分类(左/右手/脚/舌)</td></tr>
<tr><td><strong>BCI Comp IV-2b</strong></td><td>3 EEG</td><td>9</td><td>250Hz</td><td>MI 2分类(左/右手)</td></tr>
<tr><td><strong>BCI Comp III P300</strong></td><td>64 EEG</td><td>2</td><td>240Hz</td><td>P300字符拼写6×6</td></tr>
<tr><td><strong>PhysioNet MI</strong></td><td>64 EEG</td><td>109</td><td>160Hz</td><td>MI+实际运动+记录</td></tr>
</table>

<h2>13.2 MOABB基准框架</h2>
<pre><code><span class="syn-com">// MOABB（Mother Of All BCI Benchmarks）</span>
<span class="syn-kw">from</span> moabb.datasets <span class="syn-kw">import</span> BCIIV2a
<span class="syn-kw">from</span> moabb.paradigms <span class="syn-kw">import</span> MotorImagery
<span class="syn-kw">from</span> moabb.pipelines <span class="syn-kw">import</span> CSP
<span class="syn-kw">from</span> sklearn.discriminant_analysis <span class="syn-kw">import</span> LinearDiscriminantAnalysis

paradigm = MotorImagery(n_classes=4)
pipeline = {
    <span class="syn-str">"CSP+LDA"</span>: CSP(n_components=4) | LinearDiscriminantAnalysis()
}
evaluation = CrossSubjectEvaluation(
    paradigm=paradigm, datasets=[BCIIV2a()]
)
results = evaluation.process(pipeline)
<span class="syn-kw">print</span>(results.groupby(<span class="syn-str">'subject'</span>)[<span class="syn-str">'score'</span>].mean())</code></pre>

<h2>13.3 性能自测基准表</h2>
<table><tr><th>任务</th><th>随机水平</th><th>入门线</th><th>合格线</th><th>优秀线</th><th>国际SOTA</th></tr>
<tr><td>MI-2a 4分类</td><td>25%</td><td>45%</td><td>65%</td><td>80%</td><td><strong>86.2%</strong></td></tr>
<tr><td>MI-2b 2分类</td><td>50%</td><td>60%</td><td>80%</td><td>90%</td><td><strong>93.5%</strong></td></tr>
<tr><td>SSVEP 40目标</td><td>2.5%</td><td>70%</td><td>90%</td><td>95%</td><td><strong>98%+</strong></td></tr>
</table>`,
  faq:[{q:"为什么需要标准数据集？不能用自己的数据吗？",a:"自己的数据当然好，但没有标准数据集就无法对比你的算法与全球SOTA的差距。BCI Competition数据集是为数不多的被全球社区认可的'标准答案'——在上面达到80%+才能说你的算法有用。"}],
  xrefs:[3,4,20]
},
{ // Ch14
  id:14, title:"从原型到产品的工程化路径", slug:"ch14",
  summary:"原型→产品4阶段：验证原型→工程原型→用户测试版→产品化。嵌入式固件工程化检查清单，BCI产品化特殊挑战",
  tags:["产品化","工程化","创业"], difficulty:2, hours:"1.5h",
  content:`<h2>14.1 原型→产品4阶段</h2>
<table><tr><th>阶段</th><th>时间</th><th>硬件</th><th>验收标准</th></tr>
<tr><td><strong>Phase 1: 验证原型</strong></td><td>1-3月</td><td>开发板+跳线+面包板</td><td>3-5用户能用意念控制LED/光标</td></tr>
<tr><td><strong>Phase 2: 工程原型</strong></td><td>3-6月</td><td>定制PCB+3D打印外壳</td><td>延迟<100ms，连续运行>2h</td></tr>
<tr><td><strong>Phase 3: 用户测试版</strong></td><td>6-12月</td><td>小批量PCB(5-20块)</td><td>新用户5分钟上手，准确率>70%</td></tr>
<tr><td><strong>Phase 4: 产品化</strong></td><td>12-24月</td><td>注塑模具+自动化测试</td><td>量产良率>95%，售后<5%</td></tr></table>

<h2>14.2 BCI产品化特殊挑战</h2>
<table><tr><th>挑战</th><th>原因</th><th>工程对策</th></tr>
<tr><td><strong>个体差异巨大</strong></td><td>脑电信号因人而异</td><td>每次使用前5分钟校准+迁移学习</td></tr>
<tr><td><strong>信号随时间漂移</strong></td><td>电极-皮肤界面变化</td><td>ICA在线更新+自适应阈值</td></tr>
<tr><td><strong>数据隐私</strong></td><td>脑电是生物特征</td><td>端侧推理+加密+本地处理</td></tr>
<tr><td><strong>医疗器械审批</strong></td><td>NMPA/FDA周期2-5年</td><td>先做消费级，再走医疗注册</td></tr>
</table>`,
  faq:[{q:"科研原型和产品最大的区别是什么？",a:"可靠性。原型在实验室环境下跑1小时没问题就行；产品要在各种环境、各种用户、各种干扰下365天稳定运行。最大的工程挑战不是功能实现，而是异常处理和边界条件——而这正是99%的科研原型忽略的。"}],
  xrefs:[11,15]
},
{ // Ch15
  id:15, title:"BCI嵌入式工程师职业路径（2026实战版）", slug:"ch15",
  summary:"行业人才缺口分析、6家BCI企业嵌入式岗位对比（Neuralink/博睿康/强脑/Synchron/OpenBCI/中科院）、3年自学就业路线图",
  tags:["职业规划","就业","薪资"], difficulty:1, hours:"1h",
  content:`<h2>15.1 行业人才缺口</h2>
<div class="tip"><strong>Neuralink联创DJ Seo（2025-10）：</strong>"我们最缺的是<strong>软件/固件工程师</strong>和<strong>AI数据标注专家</strong>。不要求神经科学背景。"<br><br>嵌入式工程师是BCI行业最紧缺的人才，比神经科学家更缺。</div>

<h2>15.2 2026年BCI企业嵌入式岗位对比</h2>
<table><tr><th>公司</th><th>岗位</th><th>核心技能</th><th>薪资参考</th></tr>
<tr><td><strong>Neuralink</strong></td><td>Firmware Eng</td><td>C/C++, RTOS, 低功耗, BLE, ASIC验证</td><td>$150-250K</td></tr>
<tr><td><strong>博睿康</strong></td><td>嵌入式硬件</td><td>PCB设计, AFE芯片, STM32, 无线</td><td>¥30-60万</td></tr>
<tr><td><strong>强脑科技</strong></td><td>BCI算法</td><td>Python, TF, MNE, EEG信号</td><td>¥25-50万</td></tr>
<tr><td><strong>Synchron</strong></td><td>Embed Sys Eng</td><td>FPGA, 无线, 低功耗, 生物信号</td><td>$120-200K</td></tr>
<tr><td><strong>OpenBCI</strong></td><td>Firmware+社区</td><td>C/C++, 开源社区, PCB设计</td><td>$80-150K</td></tr>
</table>

<h2>15.3 3年自学就业路线图</h2>
<p><strong>第1年</strong>：嵌入式根基——STM32裸机、FreeRTOS、CMSIS-DSP → 独立设计2层PCB+写完整固件</p>
<p><strong>第2年</strong>：BCI专业能力——MNE-Python、OpenBCI Cyton实操、TFLite Micro部署 → 完整跑通全链路</p>
<p><strong>第3年</strong>：深度+就业——参加BCI Competition（Top 10）、GitHub开源项目（100+star）、至少1个完整BCI原型</p>

<p><strong>4条就业方向</strong>：A.科研路线(中科院/清华) B.创业路线(BCI初创→CTO) C.大厂路线(华为/腾讯/字节BCI组) D.海外路线(Neuralink/Synchron→需英文+GitHub)</p>`,
  faq:[{q:"没有BCI背景的嵌入式工程师能直接应聘Neuralink吗？",a:"能。DJ Seo明确说不要求神经科学背景。你需要展示的是：扎实的C/C++功底、RTOS经验、低功耗设计能力、BLE协议栈熟悉度。把这些技能映射到BCI场景（如'我设计过24bit ADC采集系统'而非'我设计过EEG采集系统'）。GitHub上有BCI相关开源贡献是加分项。"}],
  xrefs:[2,4,8]
},
{ // Ch16
  id:16, title:"神经信号检测理论深度——嵌入式可实现的理论极限", slug:"ch16",
  summary:"信息论极限（Shannon信道容量）、最优滤波理论（Wiener/Kalman/粒子滤波）、Cramér-Rao界限、神经信号可检测性矩阵",
  tags:["信息论","滤波理论","理论极限"], difficulty:5, hours:"2-3h",
  content:`<h2>16.1 神经信号检测的信息论极限</h2>
<p><strong>Shannon信道容量公式在BCI中的对应</strong>：</p>
<pre><code>C = B · log₂(1 + SNR)

头皮EEG:  C = 30 · log₂(1+0.1)  ≈ 9.6 bps   （实际BCI约5-20bps）
ECoG:     C = 500· log₂(1+1)   ≈ 500 bps  （理论上限）
侵入式:   C = 5000·log₂(1+100) ≈ 33,000 bps（单神经元级别）</code></pre>
<p>Neuralink患者用意念控制鼠标约相当于<strong>50-100 bps</strong>（含纠错）。侵入式理论还有巨大空间。</p>

<h2>16.2 最优滤波理论</h2>
<table><tr><th>滤波器</th><th>适用场景</th><th>嵌入式代价</th><th>效果</th></tr>
<tr><td><strong>维纳滤波</strong></td><td>线性最优，稳态信号</td><td>矩阵求逆O(n³)→不可实时</td><td>理论基准</td></tr>
<tr><td><strong>卡尔曼滤波</strong></td><td>线性动态系统，递归最优</td><td>O(n²)可实时（n<50）</td><td>BCI主流</td></tr>
<tr><td><strong>扩展卡尔曼EKF</strong></td><td>非线性系统</td><td>O(n³)边缘实时</td><td>非线性BCI</td></tr>
<tr><td><strong>粒子滤波</strong></td><td>非参数贝叶斯</td><td>O(N·n)→不可实时</td><td>离线分析</td></tr>
</table>

<h2>16.3 神经信号可检测性矩阵</h2>
<table><tr><th>场景</th><th>信号幅度</th><th>噪声幅度</th><th>SNR</th><th>嵌入式可行性</th></tr>
<tr><td>头皮EEG（运动想象）</td><td>5-20μV</td><td>1-5μV</td><td>2-10x</td><td>★★★ 可（需CSP/EEGNet）</td></tr>
<tr><td>头皮EEG（P300）</td><td>0.5-2μV</td><td>1-5μV</td><td>0.2-0.5x</td><td>★★ 需平均多次</td></tr>
<tr><td>ECoG（皮层电图）</td><td>50-500μV</td><td>5-50μV</td><td>10-100x</td><td>★★★★★ 最佳性价比</td></tr>
<tr><td>侵入式Spike</td><td>10-500μV</td><td>2-10μV</td><td>5-50x</td><td>★★★★ 需手术</td></tr>
</table>

<div class="note"><strong>决策规则</strong>：SNR<1→必须多次平均（不适合实时BCI）；SNR=1-5→需要复杂ML模型（EEGNet/Spectral Transformer）；SNR>10→简单LDA即可达到高准确率。</div>`,
  faq:[{q:"Cramér-Rao界对BCI嵌入式设计的实际指导意义是什么？",a:"如果你的BCI系统已达到或接近Cramér-Rao界（分类准确率的理论上限），再增加模型复杂度没有意义——应该转向硬件升级：更多通道、更低噪声AFE、更高采样率。理论极限告诉你什么时候堆算法没用，该升级硬件了。"}],
  xrefs:[3,20,9]
},
{ // Ch17
  id:17, title:"电极-组织界面物理深度分析", slug:"ch17",
  summary:"Randles等效电路模型、电极噪声源全谱分析（热噪声/闪变/电化学/EMG/EOG/ECG）、干电极物理限制与嵌入式补偿",
  tags:["电极物理","噪声","阻抗"], difficulty:4, hours:"2-3h",
  content:`<h2>17.1 电极-组织界面等效电路（Randles模型）</h2>
<pre><code>完整电化学等效电路：

       Rs（溶液电阻）
    ┌───██───┐
    │         │
    │    ┌───┴───┐
    │    │  Rct   │  （电荷转移电阻）
    │    └───┬───┘
    │         │
    │    ┌───┴───┐
    │    │  Cdl    │  （双电层电容，~10-100μF/cm²）
    │    └───┬───┘
    │         │
    └────────┴────┘</code></pre>

<p><strong>嵌入式AFE设计含义</strong>：输入阻抗需>1GΩ（Cdl在低频相当于开路），ADS1299输入阻抗2GΩ正是为此设计。</p>

<h2>17.2 电极噪声源全谱分析</h2>
<table><tr><th>噪声源</th><th>物理机制</th><th>幅值范围</th><th>频谱特征</th><th>对策</th></tr>
<tr><td><strong>热噪声</strong></td><td>电子热运动</td><td>√(4kTRB)</td><td>白噪声</td><td>降低R</td></tr>
<tr><td><strong>闪变噪声(1/f)</strong></td><td>载流子捕获</td><td>∝1/f^α</td><td>低频主导</td><td>高通滤波</td></tr>
<tr><td><strong>工频干扰</strong></td><td>50/60Hz辐射</td><td>10-1000μV</td><td>单频+谐波</td><td>DRL+软件陷波</td></tr>
<tr><td><strong>眼电伪迹(EOG)</strong></td><td>眼球运动</td><td>50-5000μV</td><td><10Hz为主</td><td>ICA成分去除</td></tr>
<tr><td><strong>运动伪迹</strong></td><td>电极-皮肤相对运动</td><td>10-1000μV</td><td>突发电涌</td><td>固定+机械稳定</td></tr>
</table>

<div class="warn"><strong>干电极物理限制</strong>：Z_contact = Rs + 1/(jωCdl) + Rct。压力不足→Cdl↓→高频截止频率↓→信号失真。正确做法：提示用户调整电极，而非盲目增加增益（因为增益增加→输入参考噪声也放大→SNR可能不改善）。</div>`,
  faq:[{q:"为什么眼电伪迹比EEG信号大100倍还能被去除？",a:"因为眼电和脑电在空间分布上完全不同——眼电主要在前额电极(Fp1/Fp2)，且波形特征(陡峭的方波)与脑电不同。ICA盲源分离可以基于统计独立性将眼电成分分离出来。嵌入式端可离线算好ICA分量矩阵（8ch×8分量=256B），在线只需做矩阵乘法（<10μs）。"}],
  xrefs:[10,3]
},
{ // Ch18
  id:18, title:"闭环BCI控制论框架", slug:"ch18",
  summary:"BCI闭环系统的控制论架构、LQR在运动恢复中的应用、MPC在自适应神经反馈中的应用、神经适应与系统稳定性对抗分析",
  tags:["控制论","闭环","LQR","MPC"], difficulty:5, hours:"2-3h",
  content:`<h2>18.1 BCI闭环系统架构</h2>
<pre><code>用户意图（大脑）
    ↓ 神经活动（隐藏状态x）
EEG/ECoG采集（观测z = Hx + v）
    ↓
解码器（状态估计 x̂ = f(z)，如Kalman/EKF）
    ↓
控制器（决策 u = K·x̂，如LQR/MPC）
    ↓
执行器（刺激/反馈/设备控制）
    ↓
用户感知反馈 → 修正意图
（闭环形成）</code></pre>

<h2>18.2 LQR在运动恢复中的应用</h2>
<p>状态x = [手的位置; 手的速度]，控制u = 电刺激强度。离线计算K矩阵（4×1矩阵=16B存储），在线只需u = Kᵀx̂（4次乘法+3次加法，<1μs）。</p>

<h2>18.3 神经适应与系统稳定性的对抗</h2>
<div class="warn"><strong>核心矛盾</strong>：用户适应BCI系统（神经可塑性）+ 系统适应用户（自适应解码器）= 二人零和博弈，可能不稳定。<br><br>
<strong>稳定性保证方法</strong>：1.限制反馈强度u_max 2.随机化反馈延迟 3.定期重新校准 4.多模型集成投票</div>`,
  faq:[{q:"为什么闭环BCI比开环BCI难做很多？",a:"开环BCI只是'读取'——采集→解码→输出，像开环温度计。闭环BCI是'读取→反馈→用户调整→再读取'的循环。最大挑战是用户会自适应系统——你今天训练好的解码器，明天可能因为用户'学会了怎么想'而失效。这本质上是一个非平稳控制问题，需要持续在线适应。"}],
  xrefs:[9,19,20]
},
{ // Ch19
  id:19, title:"EEG时频分析高级方法（超越FFT）", slug:"ch19",
  summary:"STFT vs 小波变换 vs 希尔伯特-黄变换、嵌入式DWT实现（Haar小波去噪+压缩）、HHT原理与VMD近似、同步压缩小波SST",
  tags:["时频分析","小波","HHT","DSP"], difficulty:5, hours:"2-3h",
  content:`<h2>19.1 时频分析方法对比</h2>
<table><tr><th>方法</th><th>时频分辨率</th><th>计算代价</th><th>嵌入式可行性</th><th>适用场景</th></tr>
<tr><td><strong>STFT</strong></td><td>固定</td><td>O(N·logN)</td><td>★★★★★</td><td>稳态信号（α波）</td></tr>
<tr><td><strong>连续小波CWT</strong></td><td>多分辨率</td><td>O(N·M)</td><td>★★★</td><td>瞬态事件（ERP/P300）</td></tr>
<tr><td><strong>离散小波DWT</strong></td><td>octave频带</td><td>O(N)</td><td>★★★★★</td><td>实时压缩+去噪</td></tr>
<tr><td><strong>希尔伯特-黄HHT</strong></td><td>自适应最高</td><td>O(N²)</td><td>★</td><td>非线性非平稳</td></tr>
<tr><td><strong>同步压缩SST</strong></td><td>高分辨率+锐化</td><td>O(N·M)</td><td>★★</td><td>高精度时频图</td></tr>
</table>

<h2>19.2 嵌入式DWT实现</h2>
<pre><code><span class="syn-com">// 离散小波变换（Haar小波）</span>
<span class="syn-kw">static const</span> int16_t h[] = {1, 1};  <span class="syn-com">// 低通</span>
<span class="syn-kw">static const</span> int16_t g[] = {1,-1};  <span class="syn-com">// 高通</span>

<span class="syn-kw">void</span> <span class="syn-fn">dwt_1d</span>(int16_t* x, <span class="syn-kw">int</span> n, int16_t* approx, int16_t* detail) {
    <span class="syn-kw">for</span> (<span class="syn-kw">int</span> i = 0; i &lt; n/2; i++) {
        approx[i]  = (x[2*i] + x[2*i+1]) / 2;
        detail[i] = (x[2*i] - x[2*i+1]) / 2;
    }
}</code></pre>
<p><strong>嵌入式应用</strong>：阈值去噪（detail系数<threshold→置零）+ 压缩（只传最大K个系数）+ 特征提取（approx系数做分类）。</p>

<h2>19.3 变分模态分解（VMD）近似</h2>
<p>用VMD替代EMD（经验模态分解），计算量O(N·K)，K=模态数。STM32F4@168MHz：4模态分解~5-10ms（256点）。</p>`,
  faq:[{q:"FFT已经很快了，为什么还需要小波变换？",a:"FFT只告诉你'频率A在信号里出现了多强'，但不告诉你'什么时候出现的'。ERP（事件相关电位）是典型的瞬态事件——必须在几百ms内精准定位。小波变换的多分辨率特性天然适合这种场景：低频高频率分辨率+高频高时间分辨率。"}],
  xrefs:[3,16]
},
{ // Ch20
  id:20, title:"BCI专用AI架构设计深度", slug:"ch20",
  summary:"EEGNet架构深度解析（BCI嵌入式标准网络）、图卷积网络GCN在BCI中的应用、脉冲神经网络SNN在BCI中的前景",
  tags:["AI架构","EEGNet","GCN","SNN"], difficulty:4, hours:"2-3h",
  content:`<h2>20.1 EEGNet架构深度解析</h2>
<p><strong>Layer 1</strong>: 时间卷积（F1个滤波器，kernel=64，对应250ms @250Hz）→ 提取时间模式（如ERP波形）</p>
<p><strong>Layer 2</strong>: 深度可分离卷积（Depthwise Conv，每组对应一个通道）→ 等价于CSP的神经网络版本</p>
<p><strong>Layer 3</strong>: 逐点卷积（Pointwise Conv，F2个滤波器）→ 融合各通道特征</p>
<p><strong>Layer 4</strong>: 全局平均池化（替代全连接层）→ 大幅减少参数，防过拟合</p>
<p>总参数量约6,000（INT8量化后<12KB Flash），推理延迟<500μs @STM32F4@168MHz</p>

<h2>20.2 图卷积网络（GCN）在BCI中的应用</h2>
<p>标准CNN假设规则网格，但EEG电极位置是不规则网格→用GCN。图节点=EEG电极，边=基于10-20系统距离或功能连接。嵌入式只需做稀疏矩阵-稠密矩阵乘法O(|E|·F)，对19-64通道可接受。</p>

<h2>20.3 脉冲神经网络SNN前景</h2>
<p>SNN用脉冲(0/1)通信，时间信息直接编码在脉冲时序中。侵入式BCI直接产生spike→无需"转换"。事件驱动→仅在spike到达时计算→功耗比ANN低10-100x。当前可行路径：用Loihi 2或SpiNNaker做spike信号处理。</p>

<h2>20.4 Edge AI部署技术选型</h2>
<table><tr><th>平台</th><th>算力</th><th>功耗</th><th>可部署模型</th><th>价格</th></tr>
<tr><td>Cortex-M4(STM32F4)</td><td>0.1 GOPS</td><td>50-200mW</td><td>EEGNet(6K参数)</td><td>¥30-50</td></tr>
<tr><td>Cortex-M7(STM32H7)</td><td>0.5 GOPS</td><td>100-500mW</td><td>DeepConvNet(50K)</td><td>¥100-200</td></tr>
<tr><td>Raspberry Pi 5</td><td>13.5 GOPS</td><td>3-7W</td><td>轻量LLM+EEGNet</td><td>¥400-500</td></tr>
</table>`,
  faq:[{q:"为什么EEGNet只有6000参数却能跑出80%准确率？",a:"EEGNet利用了EEG信号的两个关键结构：1)时间卷积+空间深度可分离卷积=CSP的神经网络版本（CSP本身就很有效）2)全局平均池化替代全连接层=大幅降参数防过拟合。EEG数据量小（一般几百到几千个trial），大模型很容易过拟合——所以'少即是多'在BCI中尤其重要。"}],
  xrefs:[3,13,2]
},
{ // Ch21
  id:21, title:"脑网络拓扑分析（BCI从单通道到全脑）", slug:"ch21",
  summary:"脑网络构建方法（相干性/PLV/格兰杰因果）、关键网络指标（聚类系数/路径长度/小世界系数/模块性）、脑网络作为BCI特征",
  tags:["脑网络","图论","全脑BCI"], difficulty:4, hours:"2h",
  content:`<h2>21.1 脑网络构建方法</h2>
<p>步骤：电极布置→计算功能连接（相干性/相位锁定值PLV/皮尔逊相关/格兰杰因果）→构建邻接矩阵A（C×C）→图论分析→计算网络指标</p>

<h2>21.2 关键网络指标及其BCI意义</h2>
<table><tr><th>指标</th><th>定义</th><th>BCI应用</th></tr>
<tr><td><strong>聚类系数</strong></td><td>三角形闭合比例</td><td>局部信息处理效率</td></tr>
<tr><td><strong>特征路径长度</strong></td><td>任意两节点平均最短路径</td><td>全局信息整合效率</td></tr>
<tr><td><strong>小世界系数</strong></td><td>γ/λ（高聚类+短路径）</td><td><strong>健康大脑标志</strong>，可检测病理状态</td></tr>
<tr><td><strong>节点中心性</strong></td><td>该节点在最短路径中出现次数</td><td>找出"核心脑区"→针对性采集</td></tr>
<tr><td><strong>模块性</strong></td><td>网络分模块程度</td><td>运动/视觉/默认模式网络分离度</td></tr>
</table>

<h2>21.3 脑网络作为BCI特征的优越性</h2>
<p>传统BCI特征（CSP/PSD/ERP，局部特征）→准确率~70-85%。脑网络特征（全局连接模式）→准确率可提升至~85-92%。原因：脑功能本质是网络（不是孤立区域），运动想象涉及广泛网络（运动皮层+辅助运动区+小脑）。</p>

<p><strong>嵌入式实现</strong>：8通道：8²×250=16,000次乘法→<1ms；64通道：64²×250=1,024,000次乘法→30-50ms。用CMSIS-DSP矩阵乘法函数优化。</p>`,
  faq:[{q:"脑网络分析需要多少通道？",a:"至少32通道以上才有意义。8通道只能做简单的功能连接，无法捕捉全脑网络拓扑。这也是为什么科研级BCI通常用64-256通道——不仅为了信号质量，更为了脑网络分析。但在嵌入式系统上，32通道功能连接已经可以实时计算。"}],
  xrefs:[10,13,20]
},
{ // Ch22
  id:22, title:"BCI伦理、安全与双用技术", slug:"ch22",
  summary:"BCI独特伦理风险（神经隐私/操控/黑客攻击）、神经数据安全嵌入式对策（AES-CCM/Secure Boot/端侧推理）、双用技术关注",
  tags:["伦理","安全","隐私"], difficulty:1, hours:"1h",
  content:`<h2>22.1 BCI独特伦理风险</h2>
<table><tr><th>风险</th><th>描述</th><th>技术对策</th></tr>
<tr><td><strong>神经隐私</strong></td><td>脑电能泄露innermost thoughts</td><td>端侧推理+加密</td></tr>
<tr><td><strong>神经操控</strong></td><td>BCI反馈潜意识改变用户偏好</td><td>反馈透明度+用户可控</td></tr>
<tr><td><strong>认知增强不公平</strong></td><td>BCI增强让部分人获得"超能力"</td><td>公平获取政策</td></tr>
<tr><td><strong>神经黑客攻击</strong></td><td>恶意软件通过BCI入侵大脑</td><td>安全boot+固件签名</td></tr>
<tr><td><strong>数据所有权</strong></td><td>用户脑电数据归谁？</td><td>数据主权协议</td></tr>
</table>

<h2>22.2 神经数据安全嵌入式对策</h2>
<table><tr><th>攻击类型</th><th>威胁</th><th>对策</th></tr>
<tr><td>窃听BLE传输</td><td>窃取原始EEG</td><td>BLE AES-CCM加密（nRF52硬件加速）</td></tr>
<tr><td>固件篡改</td><td>恶意解码算法读出用户意图</td><td>Secure Boot + 固件签名验证（STM32H7 TrustZone）</td></tr>
<tr><td>侧信道攻击</td><td>通过功耗分析推断处理数据</td><td>恒定时间算法 + 功耗掩码</td></tr>
<tr><td>恶意OTA</td><td>植入后门固件</td><td>OTA包必须加密+签名（AES-256+RSA-2048）</td></tr>
<tr><td>云API泄露</td><td>脑电上传云端被截获</td><td>端侧推理（TFLM），脑电数据不出设备</td></tr>
</table>

<div class="warn"><strong>嵌入式工程师的责任</strong>：优先参与开源BCI项目（而非闭源军事项目），设计中嵌入隐私保护（数据最小化+本地处理），参与BCI伦理讨论（NeuroEthics社区）。脑电数据是终极生物特征——比指纹、虹膜、DNA更加私密。</div>`,
  faq:[{q:"端侧推理真的是隐私保护的充分条件吗？",a:"端侧推理确保原始EEG数据不出设备，这是必要但不充分的条件。还需要：1)推理结果传输也需加密 2)固件必须安全启动防止篡改 3)设备配对需物理方式（如NFC触碰配对）防止中间人攻击。全链路安全是系统工程，端侧推理只是其中最核心的一环。"}],
  xrefs:[11,15]
}
];

// Appendices data
const APPENDICES = [
{ id:'A', title:"完整元器件BOM（5套方案）", slug:"appA",
  content:`<h2>BOM-1：超低预算EEG练手（¥80）</h2>
<table><tr><th>元器件</th><th>型号</th><th>数量</th><th>单价</th><th>小计</th></tr>
<tr><td>MCU板</td><td>STM32F103C8T6</td><td>1</td><td>¥12</td><td>¥12</td></tr>
<tr><td>调试器</td><td>ST-Link V2</td><td>1</td><td>¥18</td><td>¥18</td></tr>
<tr><td>生物电AFE</td><td>AD8232模块</td><td>1</td><td>¥18</td><td>¥18</td></tr>
<tr><td>导电膏</td><td>医用10ml</td><td>1</td><td>¥12</td><td>¥12</td></tr>
<tr><td colspan="4"><strong>合计</strong></td><td><strong>¥80</strong></td></tr></table>
<h2>BOM-2：8通道EEG采集原型（¥500）</h2>
<table><tr><th>元器件</th><th>型号</th><th>数量</th><th>单价</th></tr>
<tr><td>AFE板</td><td>ADS1299EEG-FE</td><td>1</td><td>¥350</td></tr>
<tr><td>MCU</td><td>STM32F407VET6</td><td>1</td><td>¥65</td></tr>
<tr><td>调试器</td><td>ST-Link V3</td><td>1</td><td>¥85</td></tr></table>`},
{ id:'B', title:"常见坑（真实血泪总结）", slug:"appB",
  content:`<h2>硬件坑</h2>
<table><tr><th>坑</th><th>现象</th><th>解决方案</th></tr>
<tr><td><strong>电极阻抗过高</strong></td><td>满屏乱跳，50Hz>EEG</td><td>阻抗>20kΩ必须处理；Lead-Off检测</td></tr>
<tr><td><strong>电源噪声耦合</strong></td><td>频谱出现开关频率尖峰</td><td>LDO(TPS7A低噪声)+充足去耦电容</td></tr>
<tr><td><strong>工频50Hz干扰</strong></td><td>50Hz处幅值为EEG的10-100x</td><td>检查DRL；软件50Hz陷波</td></tr>
<tr><td><strong>SPI数据错位</strong></td><td>各通道数据错乱</td><td>SPI时钟≤2MHz，加串行电阻匹配</td></tr></table>
<h2>固件坑</h2>
<table><tr><th>坑</th><th>解决</th></tr>
<tr><td><strong>DMA中断冲突→丢数据</strong></td><td>双缓冲+临界区保护</td></tr>
<tr><td><strong>BLE连接不稳→中断</strong></td><td>最小连接间隔7.5ms+快速连接</td></tr>
<tr><td><strong>FreeRTOS栈溢出→重启</strong></td><td>uxTaskGetStackHighWaterMark()监控</td></tr>
<tr><td><strong>TFLM内存崩溃</strong></td><td>Profiler计算最小arena→比估算值大2x</td></tr></table>
<h2>算法坑</h2>
<table><tr><th>坑</th><th>原因</th><th>解决</th></tr>
<tr><td><strong>离线好在线差</strong></td><td>时间泄漏（用了未来数据）</td><td>严格按时间切分train/test</td></tr>
<tr><td><strong>跨session崩溃</strong></td><td>电极阻抗+用户疲劳变化</td><td>每次使用前短校准1-2min</td></tr>
</table>`},
{ id:'C', title:"技术关键词全网速查表", slug:"appC",
  content:`<h2>英文搜索关键词（最精准）</h2>
<ul><li>"Brain-Computer Interface" + "embedded" + "real-time"</li><li>"EEG signal processing" + "STM32" + "ADC"</li><li>"Motor Imagery classification" + "edge AI"</li><li>"ADS1299" + "driver" + "SPI" + "STM32"</li><li>"TFLite Micro" + "EEG" + "deployment"</li><li>"EEGNet" + "compact CNN" + "BCI"</li><li>"closed-loop BCI" + "latency" + "feedback"</li></ul>
<h2>中文搜索关键词</h2>
<ul><li>脑机接口 嵌入式开发 最新进展</li><li>ADS1299 脑电采集 电路设计</li><li>STM32 BCI 固件 实时处理</li><li>OpenBCI 中文教程 入门</li><li>TFLite Micro 脑电 分类 部署</li><li>侵入式脑机接口 中国 2026</li></ul>`},
{ id:'D', title:"完整学习资源清单", slug:"appD",
  content:`<h2>免费权威资源</h2>
<table><tr><th>资源</th><th>类型</th></tr>
<tr><td>OpenBCI Documentation</td><td>硬件+固件+软件</td></tr>
<tr><td>MNE-Python Tutorials</td><td>教程</td></tr>
<tr><td>MOABB (Mother Of All BCI Benchmarks)</td><td>基准框架</td></tr>
<tr><td>BCI Competition Data</td><td>数据集</td></tr>
<tr><td>EEGNet (Lawhern et al.)</td><td>论文+GitHub</td></tr>
<tr><td>CMSIS-DSP Software Library</td><td>手册</td></tr>
<tr><td>TFLite Micro</td><td>指南</td></tr>
<tr><td>ADS1299 Datasheet</td><td>数据手册</td></tr></table>
<h2>付费但高价值</h2>
<ul><li>《Brain-Computer Interfacing》(Rao) - BCI理论基础最佳入门</li><li>《EEG Signal Processing》(Sanei) - 信号处理深度讲解</li><li>OpenBCI Cyton - 完整BCI体验</li></ul>`},
{ id:'E', title:"核心架构代码模板快速参考", slug:"appE",
  content:`<h2>ADS1299 SPI读取模板</h2>
<pre><code><span class="syn-com">// ADS1299 SPI配置（STM32 HAL）- SPI@2MHz, CPOL=1, CPHA=1</span>
<span class="syn-kw">void</span> <span class="syn-fn">ads1299_read_all_channels</span>(uint8_t *buf, uint32_t len) {
    HAL_GPIO_WritePin(CS_PORT, CS_PIN, GPIO_PIN_RESET);
    HAL_Delay_us(1);
    uint8_t cmd = 0x10; <span class="syn-com">// RDATAC命令</span>
    HAL_SPI_Transmit(&hspi1, &cmd, 1, 100);
    HAL_SPI_Receive(&hspi1, buf, len, 100);
    HAL_GPIO_WritePin(CS_PORT, CS_PIN, GPIO_PIN_SET);
}</code></pre>

<h2>CMSIS-DSP FFT模板</h2>
<pre><code><span class="syn-kw">#include</span> <span class="syn-str">"arm_math.h"</span>
<span class="syn-kw">#define</span> FFT_SIZE 256
<span class="syn-kw">static</span> arm_rfft_fast_instance_f32 fft_instance;

<span class="syn-kw">void</span> <span class="syn-fn">process_fft</span>(<span class="syn-kw">void</span>) {
    arm_rfft_fast_f32(&fft_instance, input, output, 0);
    arm_cmplx_mag_f32(output, mag, FFT_SIZE/2);
}</code></pre>

<h2>TFLite Micro部署模板</h2>
<pre><code><span class="syn-com">// 1. 模型转换：tflite_convert + post_training_quantize</span>
<span class="syn-com">// 2. xxd -i model_quant.tflite > model_data.cc</span>
<span class="syn-com">// 3. 嵌入式推理</span>
<span class="syn-kw">static</span> tflite::MicroInterpreter interpreter(
    g_model, resolver, tensor_arena, kArenaSize);
TfLiteTensor* input = interpreter.input(0);
<span class="syn-kw">memcpy</span>(input->data.f, eeg_data, <span class="syn-kw">sizeof</span>(<span class="syn-kw">float</span>)*22*250);
interpreter.Invoke();
<span class="syn-kw">int</span> class_id = argmax(output->data.f, 4);</code></pre>`},
{ id:'F', title:"值得Follow的人物/组织", slug:"appF",
  content:`<table><tr><th>人物</th><th>机构</th><th>关注原因</th></tr>
<tr><td><strong>Elon Musk</strong></td><td>Neuralink创始人</td><td>战略方向和产品化思路</td></tr>
<tr><td><strong>DJ Seo</strong></td><td>Neuralink联创</td><td>强调嵌入式人才缺口</td></tr>
<tr><td><strong>Tim Harris</strong></td><td>HHMI Janelia</td><td>Intan RHD2000系列开发者</td></tr>
<tr><td><strong>Conor Russomanno</strong></td><td>OpenBCI创始人</td><td>全球最大BCI开源社区</td></tr>
<tr><td><strong>高小榕</strong></td><td>清华大学</td><td>中国SSVEP BCI先驱</td></tr></table>
<h2>关键组织</h2>
<table><tr><th>组织</th><th>核心方向</th></tr>
<tr><td><strong>Neuralink</strong></td><td>侵入式BCI技术最前沿</td></tr>
<tr><td><strong>OpenBCI</strong></td><td>开源BCI学习源码+社区</td></tr>
<tr><td><strong>博睿康(Nerocare)</strong></td><td>中国首个获批产品化参考</td></tr>
<tr><td><strong>NeuroTechX</strong></td><td>全球BCI社区资源+活动</td></tr></table>`},
{ id:'G', title:"BCI与AI技术交叉点深度分析", slug:"appG",
  content:`<h2>大模型+BCI融合架构（2026年最热方向）</h2>
<pre><code>Layer 3: LLM意图翻译层
  将模糊神经意图 → LLM上下文消歧 → 明确指令

Layer 2: 增量学习适配层
  神经特征漂移 → 在线适配(元学习/MAML) → 持续校准

Layer 1: 嵌入式实时解码层
  MCU/FPGA: EEGNet/Spectral Transformer推理
  延迟 < 50ms, 功耗 < 10mW, 模型 < 50KB

典型部署：
  嵌入式端(TFLM)：EEGNet实时推理（<50ms）
  边缘端(RPi5/TF Lite)：增量学习+多候选生成（<500ms）
  云端(GLM-4/DeepSeek)：LLM意图翻译+上下文消歧（1-2s）</code></pre>

<h2>当前实际可行的BCI+AI项目</h2>
<table><tr><th>项目</th><th>架构</th><th>成本</th><th>难度</th></tr>
<tr><td>EEGNet运动想象</td><td>STM32F4+TFLM</td><td>¥200</td><td>Lv.4</td></tr>
<tr><td>SSVEP频率识别</td><td>STM32H7+CMSIS-DSP</td><td>¥300</td><td>Lv.3</td></tr>
<tr><td>语音+EEG多模态</td><td>RPi5+TF+OpenBCI</td><td>¥4000</td><td>Lv.5</td></tr>
<tr><td>大模型意图翻译</td><td>RPi5+LLM+EEG</td><td>¥2000</td><td>Lv.6</td></tr></table>`}
];

// Core principles
const CORE_PRINCIPLES = [
  "先非侵入再侵入 — 安全合法",
  "先Python再C — 算法验证Python，实时实现C",
  "先开源再自制 — OpenBCI/MNE等成熟生态先用起来",
  "先跑通再优化 — 能动了再搞功耗/速度/精度",
  "先模仿再创造 — 复现BCI Competition前3名方案",
  "嵌入式是骨架，信号处理是灵魂，AI是大脑",
  "紧跟国际前沿 — Neuralink架构/OpenBCI源码/SOTA论文",
  "延迟低于100ms是及格线",
  "个体差异是最大的敌人 — 必须个性化校准",
  "端侧推理是隐私的保障 — 脑电数据不出设备"
];
