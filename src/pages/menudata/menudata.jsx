// dwgk/dwgkSession/单位简介/答案为
export const navlist = {
  home: {
    link: "home",
    name: "首页",
    // children: {}
  },
  dwgk: {
    name: "单位概况",
    children:
    {
      dwjs: {
        id: 0,
        name: "单位介绍",
        // children: {}
      },
      zzjg: {
        id: 1,
        name: "组织机构",
        // children: {}
      },
      "zzzs": {
        id: 2,
        name: "资质证书",
        // children: {}
      },
      xstz: {
        id: 3,
        name: "下属台站",
        // children: {}
      }
    }
  },
  gzdt: {
    name: "工作动态",
    // children: {
    //   gzdt: { id: 0, name: "工作动态" },
    //   dtjs: { id: 1, name: "党团建设" }
    // }
  },
  hygc: {
    name: "海洋观测",
    children: {
      hygc_gjhygcw: { id: 0, name: "国家海洋观测网" },
      hygc_xmhygcw: { id: 1, name: "厦门海洋观测网" },
      hygc_jhhygcw: { id: 2, name: "近海海洋观测网" }
    }
  },
  hyyb: {
    name: "海洋预报",
    secFloor:true,
    children:
    {
      rcyb: {
        name: "日常预报",
        children: {
          hlswyb: { name: "海浪水温预报" },
          cxyb: { name: "潮汐预报" },
          hlybt: { name: "海浪预报图" },
          qzhyyb: { name: "泉州海洋预报" },
          xmhlyb: { name: "厦门海浪预报" },
          xmycyb: { name: "厦门浴场预报" },
          xmbhlyyb: { name: "厦门滨海旅游预报" }
        }
      },
      szyb: {
        name: "数值预报",
        children:
        {
          hmf: {
            id: 0, name: "海面风", children: {
              hmf_xtpy: {name:"西太平洋"},
              hmf_twhx: {name:"台湾海峡(海面风)"}
            }
          },
          hailang: {
            id: 1, name: "海浪", children: {
              hailang_twhx: {name:"台湾海峡(海浪)"},
              hailang_xjhy: {name:"厦金海域"},
              hailang_lmhy: {name:"两马海域"},
            }
          },
          hailiu: {
            id: 2, name: "海流", children: {
              hailiu_twhx: {name:"台湾海峡(海流)"},
              hailiu_xq: {name:"小区(海流)"}
            }
          },
          chaoxi: {
            id: 3, name: "潮汐", children: {
              chaoxi_twhx: {name:"台湾海峡(潮汐)"},
              chaoxi_xq: {name:"小区(潮汐)"}
            }
          },
        }
      },
      hxyb: { name: "航线预报" },
      zhyb: {
        name: "灾害预报", children: {
          yjbd: { id: 0, name: "预警报单" },
          tfyb: { id: 1, name: "台风预报" }
        }
      }
    }
  },
  hyjc: {
    name: "海洋监测",
    children:
    {
      jctx: {
        id: 0, name: "监测体系"   
      },
      zltx: {
        id: 1, name: "质量体系", children: {
              zltx_gzxsm: {name:"公正性声明"},
              zltx_zzrdqk: {name:"厦门中心站资质认定情况"} 
            }
      },
      jcrw: {
        id: 2, name: "监测任务", children: {
              jcrw_zlxrw: {name:"指令性任务"},
              jcrw_jsfw: {name:"技术服务与应急监测"}, 
            }
      },
      jcfc: { id: 0, name: "监测风采"},
    }
  },
  hyfw: {
    name: "海洋服务",
    children: {
      hyhjdcypj: { id: 0, name: "海洋环境调查与评价" },
      hysydtjc: { id: 1, name: "海域使用动态监测" },
      hysylz: { id: 2, name: "海域使用论证" },
      xcgcyjsfx: { id: 3, name: "现场观测与计算分析" },
      zxybfw: { id: 4, name: "专项预报服务" },
    }
  },
  yjya: {
    name: "应急预案",
    children: {
      gjhyjyjya: { id: 0, name: "国家海洋局<br/>应急预案" },
      dhqyjya: { id: 0, name: "东海区<br/>应急预案" },
      xmzxzyjya: { id: 0, name: "厦门中心站<br/>应急预案" },
    }
  },
  hykp: {
    name: "海洋科普",
    children: {
      hygt: { id: 0, name: "海洋国土" },
      yl: { id: 0, name: "洋流" },
      cx: { id: 0, name: "地球的呼吸“潮汐”" },
      hx: { id: 0, name: "可怕的海啸" },
      hygcjs: { id: 0, name: "海洋观测技术" },
      hyjdzg: { id: 0, name: "海洋如何改变近代中国" }
    }
  }
}
