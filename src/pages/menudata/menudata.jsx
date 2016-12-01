// export const navlist = [
//   {
//     name: '首页', link: 'home'
//   },
//   {
//     name: '单位概况', link: 'dwgk',
//     aside: [
//       { name: '单位概况' },
//       { list: ['单位概况', '组织机构', '工作职能', '资质证书', '站台介绍'] }
//     ]
//   },
//   {
//     name: '工作动态', link: 'gzdt'
//   },
//   {
//     name: '海洋预报', link: 'hyyb',
//     aside: [
//       { name: '日常海洋预报' },
//       { list: ['海浪水温预报', '海浪预报图', '潮汐预报', '泉州海洋预报', '厦门海洋预报', '滨海旅游区预报'] }
//     ]
//   },
//   {
//     name: '航线预报', link: 'hxyb',
//   },
//   {
//     name: '数值预报', link: 'szyb',
//     aside: [
//       { '海面风': ['西太平洋', '台湾海峡(海面风)'] },
//       { '海浪': ['台湾海峡(海浪)', '厦金海域', '两马海域'] },
//       { '海流': ['台湾海峡(海流)', '小区(海流)'] },
//       { '潮汐': ['台湾海峡(潮汐)', '小区(潮汐)'] }
//     ]
//   },
//   {
//     name: '海洋监测', link: 'hyjc',
//     aside: [
//       { name: '海洋监测' },
//       { list: ['检测简介', '各级考核', '课题研究', '检测产品', '东海区海洋环境质量检测任务', '福建省海洋环境质量检测任务', '地市海洋环境质量检测任务', '海洋有偿技术服务项目'] }
//     ]
//   },
//   {
//     name: '海洋观测', link: 'hygc',
//     aside: [
//       { name: '海洋观测' },
//       { list: ['海浪观测', '潮汐观测', '气象观测', '海啸灾害应急响应标准', '海浪灾害应急响应标准', '风暴潮灾害应急响标准', '风暴潮预警启动标准'] }
//     ]
//   },
//   {
//     name: '海洋服务', link: 'hyfw',
//     aside: [
//       { name: '海洋服务' },
//       { list: ['海洋服务', '海洋公报', '海洋预报', '环境监测', '工程勘察', '海域使用', '电视广告'] }
//     ]
//   }
// ];


// {'灾害预警报':['风暴潮动画示意','海浪动画示意','海浪预警报单','风暴潮预警报单']}


// export const navlist= [
//   {
//     home: {
//       link:"home",
//       name: "首页",
//       children: {}
//     }
//   },
//   {
//     dwgk: {
//       name: "单位概况",
//       children: [
//         {
//           dwjs:{
//             name:"单位介绍",
//             children:[]
//           },
//           zzjg:{
//             name:"组织机构",
//             children:[]
//           },
//           zzzs:{
//             name:"资质证书",
//             children:[]
//           },
//           xstz:{
//             name:"下属台站",
//             children:[]
//           }
//         }
//       ]
//     }
//   },
//   {
//     gzdt: {
//       name: "工作动态",
//       children: []
//     }
//   },
//   {
//     hygc: {
//       name: "海洋观测",
//       children: [
//         {
//           hlgc:{name:"海浪观测",children:[]},
//           cxgc:{name:"潮汐观测",children:[]},
//           qxgc:{name:"气象观测",children:[]}
//       }
//       ]
//     }
//   }, {
//     hyyb: {
//       name: "海洋预报",
//       children: [
//         {
//           rcyb:{name:"日常预报",children:[]},
//           szyb:{name:"数值预报",children:[]},
//           hxyb:{name:"航线预报",children:[]}
//         }
//       ]
//     }
//   },
//   {
//     hyjc: {
//       name: "海洋监测",
//       children: [
//         {
//           jcjs:{name:"监测介绍",children:[]},
//           gjkh:{name:"各级考核",children:[]},
//           ktyj:{name:"课题研究",children:[]},
//           jcnl:{name:"监测能力",children:[]},
//           rwyl:{name:"任务一览",children:[]},
//           jcfc:{name:"监测风采",children:[]},
//         }
//       ]
//     }
//   },
//   {
//     hyfw: {
//       name: "海洋服务",
//       children: []
//     }
//   },
//   {
//     yjya: {
//       name: "应急预案",
//       children: []
//     }
//   },
//   {
//     hykp: {
//       name: "海洋科普",
//       children: []
//     }
//   }
// ]

// dwgk/dwgkSession/单位简介/答案为
export const navlist = {
  home: {
    link: "home",
    name: "首页",
    children: {}
  },
  dwgk: {
    name: "单位概况",
    aside:
    [
      {
        name: "单位介绍",
        aside: [
          { name: "海浪观测", aside: {} },
          { name: "潮汐观测", aside: {} },
          { name: "气象观测", aside: {} }
        ]
      },
      {
        name: "组织机构",
        aside: []
      },
      {
        name: "资质证书",
        aside: []
      },
      {
        name: "下属台站",
        aside: []
      }
    ]
  },
  gzdt: {
    name: "工作动态",
    aside: []
  },
  hygc: {
    name: "海洋观测",
    aside:
    [
      { name: "海浪观测", aside: {} },
      { name: "潮汐观测", aside: {} },
      { name: "气象观测", aside: {} }
    ]
  },
  hyyb: {
    name: "海洋预报",
    children:
    {
      rcyb: {
        name: "日常预报", aside: [
          { ename: 'hlsw', name: '海浪水温预报' },
          { ename: 'hlyb', name: '海浪预报图' },
          { ename: 'cxyb', name: '潮汐预报' },
          { ename: 'qzhy', name: '泉州海洋预报' },
          { ename: 'xmhy', name: '厦门海洋预报' },
          { ename: 'bhly', name: '滨海旅游区预报' }]
      },
      szyb: {
        name: "数值预报", aside: [
          {
            name: '海面风', aside: [
              { name: "西太平洋" },
              { name: "台湾海峡" }]
          },
          {
            name: "海浪", aside: [
              { name: "台湾海峡(海浪)" },
              { name: "夏金海域" },
              { name: "两马海域" },
            ]
          },
          {
            name: "海流", aside: [
              { name: "台湾海峡(海流)" },
              { name: "小区(海流)" }
            ]
          },
          {
            name: "潮汐", aside: [
              { name: "台湾海峡(潮汐)" },
              { name: "小区(潮汐)" }
            ]
          }
        ]
      },
      hxyb: { name: "航线预报", aside: [] }
    }
  },
  hyjc: {
    name: "海洋监测",
    aside:
    [
      { name: "监测介绍", aside: {} },
      { name: "各级考核", aside: {} },
      { name: "课题研究", aside: {} },
      { name: "监测能力", aside: {} },
      { name: "任务一览", aside: {} },
      { name: "监测风采", aside: {} },
    ]
  },
  hyfw: {
    name: "海洋服务",
    aside: []
  },
  yjya: {
    name: "应急预案",
    aside: []
  },
  hykp: {
    name: "海洋科普",
    aside: []
  }
}