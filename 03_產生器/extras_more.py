# -*- coding: utf-8 -*-
"""延伸資源：補充影片（由 build_more.py 依 YouTube oembed 實際標題/頻道自動產生，勿手改標題）。
合併規則：make_interactive.py 會把這裡的影片接在 EXTRAS 原有影片之後（同網址不重複）。"""
MORE_VIDEOS = {
 '九上3-4': [
  {'title': '大自然的力量The Power of Nature －認識再生能源', 'source': '再生能源網', 'url': 'https://www.youtube.com/watch?v=dIMwxr0Tfxg'},
 ],
 '九下4-3': [
  {'title': '【KNSH SDGs 永續教育 成就未來】康軒－認識SDGs動畫', 'source': '康軒陪你教國小', 'url': 'https://www.youtube.com/watch?v=sdiwEw26sUc'},
 ],
 '生物1-1': [
  {'title': '國一上生物1-1(1)生命現象', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=5so6nIBJS28'},
 ],
 '生物1-2': [
  {'title': '國一上生物2-1細胞(1)-細胞發現與細胞學說', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=NmfmeNTazFY'},
  {'title': '國一上自然2-1細胞(3)-動物細胞構造', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=cLh8Y9VMifI'},
  {'title': '國一上自然2-1細胞(4)-植物細胞構造', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=rZdL4RIFt9A'},
  {'title': '國一上自然2-1細胞(5)-複式顯微鏡構造', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=o0B2muHMYpQ'},
 ],
 '生物1-3': [
  {'title': '國一上自然2-3從細胞到個體(1)-單細胞生物', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=mRfnEud-wS8'},
  {'title': '國一上自然2-3從細胞到個體(2)-動物的層次', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=x-NPYY609p0'},
  {'title': '國一上自然2-3從細胞到個體(3)-植物的層次', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=tCjf0UINrV8'},
 ],
 '生物2-1': [
  {'title': '國一上生物 3-1食物中的營養(1)-六大營養素介紹', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=Gn9L2jf1mrc'},
  {'title': '國一上生物3-2酵素(1)-催化劑與專一性', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=mAK9eB3byuU'},
  {'title': '國一上生物3-2酵素(2)-酵素與溫度/酸鹼的關係', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=CJf_SoemwaQ'},
 ],
 '生物2-2': [
  {'title': '國一上生物3-3植物如何獲得養分(1)-葉的構造', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=A-OCpGhMwmE'},
  {'title': '國一上生物3-3植物如何獲得養分(2)-光合作用', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=pC6O05lXRTc'},
  {'title': '國一上生物3-3植物如何獲得養分(3)光合作用歸納', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=tG3Lbmejr0E'},
 ],
 '生物2-3': [
  {'title': '國一上生物3-4動物如何獲得養分(2)-消化作用', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=64G7Pawwg-o'},
  {'title': '國一上生物3-4動物如何獲得養分(5)-消化管/消化腺', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=iQOkKh_rsFs'},
  {'title': '國一上生物3-4動物如何獲得養分(8)-小腸的吸收', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=X7oSYUuaMkA'},
 ],
 '生物3-1': [
  {'title': '國一上生物4-1植物的運輸構造(1)-維管束', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=k37k1WvDx3o'},
  {'title': '國一上生物4-2植物體內物質運輸', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=Mv020DXiR5Y'},
 ],
 '生物3-2': [
  {'title': '國一上自然4-3心臟與血管', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=nR_DioF2VRM'},
  {'title': '國一上生物4-3動物的物質運輸(3)-體循環/肺循環', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=qAn0C_JCujc'},
  {'title': '國一上生物4-3動物的物質運輸(5)-血管', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=mLs_Lpo4uuA'},
  {'title': '國一上生物4-3動物的物質運輸(6)-血液', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=DPqY36wIWTU'},
 ],
 '生物3-3': [
  {'title': '國一上生物4-3動物的物質運輸(7)-淋巴循環', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=QdnC_R0CjKc'},
 ],
 '生物4-1': [
  {'title': '國一上生物5-1神經系統(0)-神經系統動畫', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=H50zdxeJvwk'},
  {'title': '國一上生物5-1(3)神經系統的階層', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=JXq1skUB34M'},
  {'title': '國一上生物5-1(6)神經傳導途徑(意識/反射)', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=RhsD9OKmTb0'},
 ],
 '生物4-2': [
  {'title': '國一上生物5-2(1)內分泌的運作原理', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=xS7RbfjflNo'},
  {'title': '國一上生物5-2(2)內分泌-腦垂腺/甲狀腺', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=nkPTckUCgJ8'},
  {'title': '國一上生物5-2(3)內分泌-副甲狀腺/腎上腺', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=osiQC6uuY0g'},
 ],
 '生物4-3': [
  {'title': '國一上生物6-1恆定性', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=r_5Cd40AORM'},
  {'title': '國一上生物6-2體溫的恆定', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=4kVTdVV7Q58'},
  {'title': '國一上生物6-5血糖的恆定', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=wpNJNVMw7oE'},
 ],
 '生物5-1': [
  {'title': '國一下生物1-1(1)染色體-生殖的基礎', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=MQttQqOHJvM'},
  {'title': '國一下生物1-1(2)細胞分裂的過程', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=ES8PbXdD6rI'},
  {'title': '國一下生物1-1(3)減數分裂', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=bP_7snMW-bE'},
 ],
 '生物5-2': [
  {'title': '國一下生物1-2無性生殖', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=rBWXJgaBEZE'},
  {'title': '國一下生物1-3有性生殖(1)-受精方式', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=jcbKa6YtG4s'},
 ],
 '生物5-3': [
  {'title': '國一下生物1-3有性生殖(2)-開花植物的構造', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=Vx3a-StFgKI'},
  {'title': '國一下生物1-3有性生殖(3)-花的授粉/花粉管/受精', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=ctziyDF2mbc'},
  {'title': '國一下生物1-3有性生殖(4)-人類的生殖', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=Qcu3u9DolM8'},
 ],
 '生物6-1': [
  {'title': '國一下生物2-1(1)孟德爾豌豆遺傳實驗', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=6AuypFyRxJ0'},
  {'title': '國一下生物2-1(2)基因型/表現型', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=0CY1I5CGKtI'},
  {'title': '國一下生物2-1遺傳例題', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=BKZR9m7w5fg'},
 ],
 '生物6-2': [
  {'title': '國一下生物2-3(2)人類的ABO血型', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=IDI20UcMURQ'},
  {'title': '國一下生物2-3(3)性別遺傳', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=rnrDcjvC--g'},
  {'title': '國一下生物2-4突變(4)-遺傳性疾病-性聯遺傳原理', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=H_C9HJPdLzA'},
 ],
 '生物6-3': [
  {'title': '國一下生物2-2(2)基因', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=C8jkD9GlU_A'},
  {'title': '國一下生物2-4突變(1)', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=97K2dsrNB3o'},
  {'title': '國一下生物2-5生物科技(1)基因轉殖', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=ZGUodWHddgg'},
 ],
 '生物7-1': [
  {'title': '國一下生物3-1(2)演化論-達爾文天擇說', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=Muge3dJ35qU'},
  {'title': '國一下生物3-1(1)化石的形成', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=W76q1GOErEI'},
 ],
 '生物7-2': [
  {'title': '國一下生物3-2(1)生物的命名Ⅰ學名Ⅰ分類學', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=Jj4nEaB5cXY'},
  {'title': '國一下生物 3-1(2) 分類階層Ⅰ五大界介紹Ⅰ108新課綱', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=vnEc3fj17to'},
 ],
 '生物8-1': [
  {'title': '國一下生物5-1(2)族群估算：樣區法', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=fnlQtzdlchQ'},
  {'title': '國一下生物5-4生物的交互關係', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=AshcsnqTS4k'},
 ],
 '生物8-2': [
  {'title': '國一下生物5-1(1)生態系的組成', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=4cm4rPD21Gs'},
  {'title': '國一下生物5-2能量的流動', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=RPUrWx-TiqY'},
  {'title': '國一下生物5-3(2)物質循環-碳循環', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=YOeu8Zs1Anw'},
 ],
 '生物8-3': [
  {'title': '國一下生物第6章(1)生物多樣性與環保', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=6WVh8FYPkbQ'},
 ],
 '八上1-1': [
  {'title': '國二上1-1進入實驗室-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=HxLCyBiP1x8'},
 ],
 '八上1-3': [
  {'title': '國二上1-3質量的測量-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=C4QqiIbAYbk'},
 ],
 '八上1-4': [
  {'title': '國二上1-4密度-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=BhIAzQW4ilc'},
  {'title': '國二上1-4密度-3', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=rTf5pH21Im0'},
 ],
 '八上2-1': [
  {'title': '國二上理化2-1認識物質(2)-物質的變化與性質', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=d2lalgzct0M'},
 ],
 '八上2-2': [
  {'title': '國二上理化2-1認識物質(1)-純物質與混合物', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=HELZDAJFrF4'},
 ],
 '八上2-3': [
  {'title': '國二上理化2-1認識物質(3)-物質的分離', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=QWu1lr9BGDk'},
 ],
 '八上2-4': [
  {'title': '國二上2-1溶解度-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=vLNFmlWjKS0'},
  {'title': '國二上理化2-2水溶液(2)-重量百分濃度(含例題)', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=1ysYqOoEJjM'},
 ],
 '八上3-1': [
  {'title': '國二上3-1波-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=0QisrNQaPsY'},
  {'title': '國二上3-1波-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=Mh-L_jN9uIk'},
 ],
 '八上3-2': [
  {'title': '國二上3-2聲音-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=LSufbZ_i03I'},
  {'title': '國二上3-2聲音-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=NgzDkH0WSck'},
 ],
 '八上3-3': [
  {'title': '國二上3-4聲音的三要素-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=2aHSJZ2rpgk'},
  {'title': '國二上3-4聲音的三要素-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=fZgqaUWmGq4'},
 ],
 '八上3-4': [
  {'title': '國二上3-3回聲-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=ptTANBdPcCc'},
  {'title': '國二上3-3回聲-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=_PhCTS-a1VA'},
 ],
 '八上4-1': [
  {'title': '國二上4-1光的直進-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=M_WWyJNpHzA'},
  {'title': '國二上4-2平面鏡-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=B4ESkXC07FE'},
 ],
 '八上4-2': [
  {'title': '國二上4-3光的折射-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=4m3Cmv01MTs'},
  {'title': '國二上4-3透鏡成像-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=8ceLW89O6-Q'},
 ],
 '八上4-3': [
  {'title': '國二上4-5色光與顏色-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=sX9ykenTdBI'},
  {'title': '國二上4-5色光與顏色-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=F413zcquitw'},
 ],
 '八上4-4': [
  {'title': '國二上4-4光學儀器-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=oQpkTUPqPh0'},
  {'title': '國二上4-4光學儀器-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=cTwmrlhBiIM'},
 ],
 '八上5-1': [
  {'title': '國二上5-1溫度-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=X8G4QOexnjM'},
  {'title': '國二上5-1溫度-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=uAVxKGh3B-Y'},
 ],
 '八上5-2': [
  {'title': '國二上5-2.3熱量和比熱-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=bm6K-dYALYs'},
  {'title': '國二上5-2.3熱量和比熱-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=1A4uoZG3urU'},
 ],
 '八上5-3': [
  {'title': '國二上5-4熱的傳播-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=QmVHWfgyOHM'},
  {'title': '國二上5-4熱的傳播-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=gNvuWLCdNd4'},
 ],
 '八上5-4': [
  {'title': '國二上5-5熱的作用-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=7Bhh1FCjNHU'},
  {'title': '國二上5-5熱的作用-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=1Jg8H0DcXqY'},
 ],
 '八上6-1': [
  {'title': '國二上理化6-4(1)道耳頓原子說', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=5dpz8DBE9ig'},
  {'title': '國二上理化6-4(3)原子模型的演進史', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=tTYnTsssi44'},
  {'title': '國二上理化6-4(4)原子序和質量數', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=j6w_pgvtt1k'},
 ],
 '八上6-2': [
  {'title': '國二上6-2金屬非金屬與元素符號-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=5l1bQ_2_PZs'},
  {'title': '國二上6-2金屬非金屬與元素符號-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=zaFsOIDltqE'},
  {'title': '國二上理化6-2(1)非金屬/金屬元素比較', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=4C1K-bq9Yro'},
 ],
 '八上6-4': [
  {'title': '國二上6-4化學式-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=iIfNJmQgLcM'},
  {'title': '國二上6-4化學式-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=rpOsRBucP8w'},
 ],
 '八下1-1': [
  {'title': '國二下1-2化學反應式-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=rk3vox08wNc'},
  {'title': '國二下1-2化學反應式-3', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=EZ94hkyOjH0'},
 ],
 '八下1-2': [
  {'title': '國二下1-1質量守恆定律-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=hS7e5ZO1oI0'},
 ],
 '八下1-3': [
  {'title': '國二下1-3莫耳數-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=ffqM1uwLr1E'},
 ],
 '八下1-4': [
  {'title': '國二上理化5-5吸熱/放熱反應', 'source': 'nemo的生物教室', 'url': 'https://www.youtube.com/watch?v=hpn9ok78kns'},
 ],
 '八下2-1': [
  {'title': '國二下2-1氧化還原-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=Gb4rRWUVvcE'},
 ],
 '八下2-2': [
  {'title': '國二下2-1氧化還原-3', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=jhO7_fgvrlM'},
  {'title': '國二下2-2鐵礦的冶煉', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=hTa7dm-OuX4'},
 ],
 '八下2-3': [
  {'title': '國二下2-3生活中的氧化還原', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=yhLhy9JQAZg'},
  {'title': '國三下2-1鋅銅電池-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=9pczMDbgf_Y'},
 ],
 '八下3-1': [
  {'title': '國二下3-1電解質-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=KB_fXDPf8jk'},
  {'title': '國二下3-1電解質-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=iKn-TzEGDS8'},
 ],
 '八下3-2': [
  {'title': '國二下3-2酸與鹼-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=XdJmZtvKQk4'},
  {'title': '國二下3-2酸與鹼-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=5Y2srOhlzv8'},
 ],
 '八下3-3': [
  {'title': '國二下3-3pH值-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=hVgz0---85o'},
  {'title': '國二下3-4酸鹼中和-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=GhmmqOj5RQk'},
  {'title': '國二下3-4酸鹼中和-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=90l4JqUag4E'},
 ],
 '八下4-1': [
  {'title': '國二下4-1反應速率-碰撞學說', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=bdDyVzT9AOM'},
 ],
 '八下4-2': [
  {'title': '國二下4-1反應速率-濃度與表面積-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=tj9izCKFfX0'},
  {'title': '國二下4-2反應速率-溫度', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=njl4WPSlBkQ'},
  {'title': '國二下4-3反應速率-催化劑', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=Lq9Kaj9MDOc'},
 ],
 '八下4-3': [
  {'title': '國二下4-4可逆反應與平衡-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=6DJzeQ733Go'},
  {'title': '國二下4-4可逆反應與平衡-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=xaZbZbInQaE'},
 ],
 '八下5-1': [
  {'title': '國二下5-1有機化合物', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=1bizGL_9nPM'},
  {'title': '國二下5-2有機化合物的分類', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=FGg1x_hcdeE'},
 ],
 '八下5-2': [
  {'title': '國二下5-3常見的有機化合物-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=_aH89NSo1yw'},
  {'title': '國二下5-3常見的有機化合物-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=ijQTqNBht2E'},
 ],
 '八下5-3': [
  {'title': '國二下5-4聚合物', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=1bzNEWx9kXk'},
 ],
 '八下6-1': [
  {'title': '國二下6-1力', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=aApEu9oXo6o'},
 ],
 '八下6-2': [
  {'title': '國二下6-2力的測量', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=Q-OKI47DNGk'},
  {'title': '國二下6-3摩擦力', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=lQSkTz2FQ9k'},
 ],
 '八下6-3': [
  {'title': '國二下6-4壓力', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=dApjdkkbXw0'},
 ],
 '八下6-4': [
  {'title': '國二下6-4水壓-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=9JoSKKObxgI'},
  {'title': '國二下6-4大氣壓力', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=fi93YfJ6gHE'},
  {'title': '國二下6-5浮力-沉體', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=VK7qrQ_kaaU'},
  {'title': '國二下6-5浮力-浮體', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=_10XVY953KM'},
 ],
 '九上1-2': [
  {'title': '國三上1-3速度與速率-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=r1FHaJhwzGY'},
 ],
 '九上1-3': [
  {'title': '國三上1-4加速度-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=dy_-te5y-84'},
  {'title': '國三上1-5自由落體', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=i5MrMALUbg0'},
 ],
 '九上2-2': [
  {'title': '國三上2-2牛頓第二運動定律-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=He_rGd5wTWQ'},
 ],
 '九上2-3': [
  {'title': '國三上2-3 牛頓第三運動定律-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=jkWQhad9qyA'},
 ],
 '九上2-4': [
  {'title': '國三上2-3萬有引力-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=_s8i-ls3BWs'},
  {'title': '國三上2-3萬有引力-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=xBExHM0JNM0'},
 ],
 '九上3-1': [
  {'title': '國三上3-1作功-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=f1mSJTrkHaM'},
  {'title': '國三上3-1作功-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=DSouGTANn7c'},
 ],
 '九上3-2': [
  {'title': '國三上3-2動能位能-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=-v0fMc8wV7E'},
  {'title': '國三上3-2動能位能-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=2-XauMOG60Q'},
 ],
 '九上4-1': [
  {'title': '國三上4-1靜電感應-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=6yocj99gzUk'},
  {'title': '國三上4-1靜電感應-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=TDmL1jD3zIs'},
 ],
 '九上4-2': [
  {'title': '國三上4-2電路電流-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=wXxDlzEx46s'},
  {'title': '國三上4-2電路電流-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=splS1ELAnG0'},
 ],
 '九上4-3': [
  {'title': '國三上4-3電壓', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=2y0JP571Ze8'},
  {'title': '國三上4-4電阻與歐姆定律-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=AHuG-MVURbU'},
 ],
 '九上5-1': [
  {'title': '水的分布與水循環－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=gZa-Nd6Qywg'},
  {'title': '地下水part1 - 講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=O6HkYCKyu_I'},
 ],
 '九上5-2': [
  {'title': '礦物 - 講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=TvLR_TPYMVs'},
  {'title': '岩石part1 -  講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=llI12K3r9jI'},
  {'title': '岩石part2 - 講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=M4qKO9TJJHE'},
 ],
 '九上5-3': [
  {'title': '風化作用－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=LGYv6NrYtAk'},
  {'title': '侵蝕、搬運與沉積作用 - 講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=5KHYArJZ1XU'},
 ],
 '九上6-1': [
  {'title': '地球的內部構造－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=RiQ50bpXhoE'},
  {'title': '板塊運動學說-講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=WQ4BQWiZeL0'},
  {'title': '板塊交界的地質作用－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=5gAeLGkI3B4'},
 ],
 '九上6-2': [
  {'title': '地殼變動：地震part1－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=peuOQi_-UMA'},
  {'title': '地殼變動：地震part2－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=hxsMtY48V-0'},
 ],
 '九上6-3': [
  {'title': '地球的歷史：化石－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=sc9BG63agkk'},
  {'title': '解讀地球的歷史－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=RUR9lgkTQyk'},
  {'title': '地質年代－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=M_KDkTJmV0I'},
 ],
 '九上7-1': [
  {'title': '晝夜交替－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=Cp6CWCYORUo'},
  {'title': '四季變化part1－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=KRkTz-wTcrw'},
 ],
 '九上7-2': [
  {'title': '月球的盈虧現象－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=gyQ2yjmNqQI'},
  {'title': '月球的升落時間-講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=_r4CS0eiK9Y'},
 ],
 '九上7-3': [
  {'title': '太陽系的成員－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=oNaTNmwbcxc'},
  {'title': '宇宙的組織－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=fS2umNcYDVc'},
 ],
 '九下1-1': [
  {'title': '國三下2-2電解-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=ABb5KitCvqo'},
  {'title': '國三下2-2電鍍', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=s4YnXKwtLRk'},
 ],
 '九下1-2': [
  {'title': '國三下1-1電功率-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=rB7UQDGp8TE'},
  {'title': '國三下1-2電費的計算', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=oNXB8gxk57E'},
 ],
 '九下1-3': [
  {'title': '國三下1-2直流電與交流電', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=NRXUjDdwJF4'},
 ],
 '九下2-1': [
  {'title': '國三下3-1磁鐵與磁場-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=8HIreGoUmAI'},
 ],
 '九下2-2': [
  {'title': '國三下3-2電生磁(電流的磁效應)-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=fG0wSIE62dU'},
 ],
 '九下2-3': [
  {'title': '國三下3-3電流與磁場的交互作用-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=XiH3liuktpo'},
  {'title': '國三下3-3電流與磁場的交互作用-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=J8AQ81-c3iQ'},
 ],
 '九下2-4': [
  {'title': '國三下3-4電生磁-電磁感應-1', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=TJeTSXyJKac'},
  {'title': '國三下3-4電生磁-電磁感應-2', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=6mXP5DOZiTk'},
  {'title': '國三下3-4電生磁-發電機', 'source': '國中理化自學', 'url': 'https://www.youtube.com/watch?v=mLTGxVSar4I'},
 ],
 '九下3-1': [
  {'title': '大氣的組成－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=AQMkjuUEWQg'},
  {'title': '大氣的垂直構造－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=Oe4ugwYckNk'},
  {'title': '空氣的流動part1:氣壓與風－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=8Mw969th2K0'},
 ],
 '九下3-2': [
  {'title': '空氣中的水氣－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=ertzISMD-gg'},
  {'title': '雲霧霜露的形成－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=siAG8WAkq3k'},
  {'title': '氣團－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=BSTFZB0um3s'},
  {'title': '鋒面－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=oH5rPGvrE8k'},
 ],
 '九下3-3': [
  {'title': '台灣的氣候：季風－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=HQjfxaMfdFk'},
  {'title': '台灣的氣候：寒潮與梅雨－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=SGiTOsoRxdM'},
  {'title': '台灣的氣候：颱風－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=sKxw-E_0nqc'},
 ],
 '九下4-1': [
  {'title': '溫室效應與全球暖化－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=0ze4hNVse70'},
 ],
 '九下4-2': [
  {'title': '潮汐－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=BpSOMjUq6Vw'},
  {'title': '海流與氣候變化－講課', 'source': '吳美琍', 'url': 'https://www.youtube.com/watch?v=Zy_apagecUY'},
 ],
 '八上6-3': [
  {'title': '【觀念】同素異形體、同位素和同分異構物的比較', 'source': '均一教育平台', 'url': 'https://www.junyiacademy.org/junyi-science/middle-school-physics-chemistry/s4zyg-/v/p8Oxb1V7a_Y'},
 ],
}

# PhET 模擬：說明文字依各模擬官方繁中介面字串（畫面名稱、按鈕）撰寫，已逐一核對存在
MORE_PHET = {
 '九上3-4': {'slug':'energy-forms-and-changes','title':'能量形式與轉化',
   'note':'切到「系統」畫面比較不同的能量來源：用太陽光照射時，拉動「雲」的多寡，會發現雲愈多、發出的電愈少；也可以改成騎腳踏車發電。想想看：哪些能源會用完、哪些可以一直再生？'},
 '八上3-3': {'slug':'waves-intro','title':'波的介紹',
   'note':'切到「聲音」畫面打開聲波產生器，拉「頻率」滑桿聽聲音變高或變低（音調），拉「振幅」滑桿聽聲音變大或變小（響度），同時看空氣中的波紋怎麼跟著改變。'},
 '八下1-1': {'slug':'balancing-chemical-equations','title':'平衡化學方程式',
   'note':'從「製造氨氣」「分解水」「燃燒甲烷」選一個反應，調整每種分子前面的係數，畫面會用圖表比較反應前後每一種原子的數量；左右兩邊每種原子數量都一樣，才會顯示「已平衡」。最後還有「遊戲」可以闖關練習。'},
 '八下1-2': {'slug':'reactants-products-and-leftovers','title':'反應物、生成物及剩餘物',
   'note':'先用「三明治」畫面理解：材料要照固定比例組合，多出來的材料就會剩下；再到「分子」畫面選「製造水」「製造氨」「燃燒甲烷」，比對反應前、反應後的原子，會發現原子的種類和數量都沒有改變——這就是質量守恆。'},
 '八下3-2': {'slug':'acid-base-solutions','title':'酸鹼溶液',
   'note':'在「介紹」畫面選強酸、弱酸、強鹼、弱鹼或純水，用放大鏡看溶液裡的粒子，再用工具量量它的 pH 值；「自訂溶液」畫面還能自己調濃度和強弱，比較它們的 pH 值差別。'},
 '八下3-3': {'slug':'ph-scale-basics','title':'酸鹼性：基礎',
   'note':'把咖啡、牛乳、柳橙汁、汽水、洗手肥皂、水管清潔劑等倒進燒杯，用 pH 計測量它是酸性、中性還是鹼性；再加水稀釋，觀察 pH 值會往 7 靠近。'},
 '八下6-1': {'slug':'forces-and-motion-basics','title':'力和運動：基礎',
   'note':'「拔河」畫面讓兩隊的人拉同一台推車，畫面會顯示左邊力量、右邊力量和「力量總和」；兩邊一樣大時合力為零、推車不動，一邊比較大時推車就往那邊跑，直接看懂合力。'},
 '八下6-2': {'slug':'hookes-law','title':'虎克定律',
   'note':'在「介紹」畫面拉動彈簧、改變作用力與彈性係數，畫面同時顯示作用力、彈力和位移；會發現作用力加倍時彈簧伸長量也加倍，這就是虎克定律。「系統」畫面還能比較兩條彈簧串聯與並聯。'},
 '八下6-4': {'slug':'buoyancy-basics','title':'浮力：基礎',
   'note':'「探索」畫面把方塊放進液體，打開「力」的顯示，就能同時看到重力和浮力的箭頭與大小，浮力等於重力時方塊就浮著；「比較」畫面可以拿相同質量、相同體積或相同密度的方塊放進水裡比浮沉。'},
 '九上2-2': {'slug':'forces-and-motion-basics','title':'力和運動：基礎',
   'note':'到「加速度」畫面，用不同大小的作用力推動箱子，並改變箱子上的物品（質量），畫面會顯示加速度數值：力愈大加速度愈大、質量愈大加速度愈小，親手驗證牛頓第二運動定律 F＝ma。'},
 '九上2-4': {'slug':'gravity-force-lab-basics','title':'萬有引力實驗室：基礎',
   'note':'調整兩個球體的質量，並拖動它們改變距離，畫面會顯示兩球之間的引力大小：質量愈大引力愈大，距離愈遠引力愈小；而且兩球互相吸引的力永遠一樣大、方向相反。'},
 '九上3-2': {'slug':'energy-skate-park-basics','title':'能量滑板競技場：基礎',
   'note':'在「入門」畫面讓滑板玩家從不同高度滑下，打開「圓餅圖」看動能和位能怎麼互相轉換：愈高位能愈大、愈低速率愈快，沒有摩擦時總能量不變；切到「摩擦力」畫面，還會看到部分能量變成熱能。'},
 '九上3-3': {'slug':'energy-forms-and-changes','title':'能量形式與轉化',
   'note':'切到「系統」畫面，選一個能量來源（例如太陽光或騎腳踏車）接上發電機，再接上用電的裝置，畫面會用小方塊標出化學能、力學能、電能、光能、熱能，讓你看清楚能量一路是怎麼轉換的。'},
 '九上4-1': {'slug':'balloons-and-static-electricity','title':'氣球和靜電引力',
   'note':'把氣球拿去毛衣上摩擦，選「顯示所有電荷」，會看到毛衣的負電荷（電子）跑到氣球上；再把氣球靠近牆壁，牆上的電荷會重新排列，氣球就被吸過去——這就是摩擦起電和靜電感應。'},
 '九上4-2': {'slug':'circuit-construction-kit-dc','title':'電路組裝套件：直流電',
   'note':'用電池、電線、燈泡和開關接出一個通路，打開開關就會看到電流在電線裡流動；再把電表串接進電路的不同位置量電流，比較串聯和並聯時電流的分配方式。'},
 '九下2-1': {'slug':'magnets-and-electromagnets','title':'磁鐵與電磁鐵',
   'note':'在「條狀磁鐵」畫面拖動羅盤繞著磁鐵走一圈，看羅盤指針怎麼跟著轉，畫面上許多小指針排出了磁場的形狀；用「磁場計」測量，會發現愈靠近磁極，磁場愈強。'},
 '九下2-2': {'slug':'magnets-and-electromagnets','title':'磁鐵與電磁鐵',
   'note':'切到「電磁鐵」畫面，用電池讓電流通過線圈，旁邊的羅盤就會偏轉，表示電流產生了磁場；再改變電池電壓、線圈數，或按「翻轉極性」，觀察電磁鐵的磁性強弱和 N、S 極怎麼改變。'},
 '九下2-4': {'slug':'faradays-law','title':'法拉第定律',
   'note':'拿磁鐵在線圈裡推進、拉出，燈泡會亮、伏特計的指針會擺動；磁鐵停著不動時就沒有反應，移動得愈快燈泡愈亮——親眼看到「磁場改變才會產生感應電流」。'},
 '九下4-1': {'slug':'greenhouse-effect','title':'溫室效應',
   'note':'在「波」畫面讓陽光照射地表，調整「溫室氣體濃度」（從冰河時期到很高），看地表反射出去的紅外線被大氣吸收了多少，並用表面溫度計觀察地表溫度怎麼跟著上升。'},
 '生物4-1': {'slug':'neuron','title':'神經元',
   'note':'按下刺激神經元的按鈕，就能看到神經衝動沿著神經元一路傳下去；右邊的「膜電位與時間關係圖」會畫出訊號經過時電位的變化，幫助理解神經訊息是怎麼傳遞的。（畫面上的離子通道屬高中內容，國中只要看懂訊號會沿神經傳遞即可。）'},
 '生物7-1': {'slug':'natural-selection','title':'天擇',
   'note':'先「加入夥伴」讓兔子開始繁殖，再「加入突變」（例如棕色毛皮），然後開啟環境因子「狼」：在不同環境下，某種毛色的兔子比較容易被狼吃掉，幾代之後兔群的毛色比例就改變了——這就是天擇。'},
}
