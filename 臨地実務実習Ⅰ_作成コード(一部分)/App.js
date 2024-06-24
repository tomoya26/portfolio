import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import EmpCodeChange from './EmpCodeChange.js';
import EmpList from './EmpList.js';
import EmpDet from './EmpDet.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import "./Style.css";
import Axios from 'axios';

function App() {
    //DBから持ってきたもの格納用
    const [Syain, setSyain] = useState([])
    //画面遷移時のデータの受け渡しに使用する配列
    const [Data, setData] = useState([])
    const [Code, setCode] = useState([])
    const [Del, setDel] = useState([])
    //画面遷移用配列に直接データをセットできなかったため仮の配列を作成。
    const TmpData = []
    const CodeData = []
    const DelData = []
    const [DateChange, setDateChange] = useState(true)

    //レイアウトと描画の後で実行
    //DBから社員のデータを取得を行う（第2引数が[]になっている為、最初の一度しかデータを取得を行わない）
    useEffect(() => {
        if (DateChange == true) {
            Axios.get('api/users/App')
                .then((res) => {
                    setSyain(res.data)
                    setNo(res.data)
                }, [])
                .catch(() => {
                    console.log("catch log");
                })
            setDateChange(false)
        }
    }, [DateChange])

//各処理に渡す用の配列作成（表示するデータのみを配列に格納）
//第2引数が[Syain]の為、初回読み込み時と[Syain]に変更があった場合に処理が行われる。
    useEffect(() => {
        //社員のデータを取得後、変数に格納を行う
        if (Syain.length > 0) {
            for (let i = 0; i < Syain.length; i++) {
                //DBの各データを変数に格納する
                let EmpNo = JSON.stringify(Syain[i].empNo)
                let Nm1 = JSON.stringify(Syain[i].nm1)
                let Nm2 = JSON.stringify(Syain[i].nm2)
                let Nmk1 = JSON.stringify(Syain[i].nmk1)
                let Nmk2 = JSON.stringify(Syain[i].nmk2)
                let BirthY = JSON.stringify(Syain[i].birthY)
                let BirthM = JSON.stringify(Syain[i].birthM)
                let BirthD = JSON.stringify(Syain[i].birthD)
                let Bumon = JSON.stringify(Syain[i].bumon)
                let PostNo1 = JSON.stringify(Syain[i].postNo1)
                let PostNo2 = JSON.stringify(Syain[i].postNo2)
                let Adress1 = JSON.stringify(Syain[i].adress1)
                let Adress2 = JSON.stringify(Syain[i].adress2)
                let Tel1 = JSON.stringify(Syain[i].tel1)
                let Tel2 = JSON.stringify(Syain[i].tel2)
                let Tel3 = JSON.stringify(Syain[i].tel3)
                let Mail1 = JSON.stringify(Syain[i].mail1)
                let Mail2 = JSON.stringify(Syain[i].mail2)
                let Gender = JSON.stringify(Syain[i].gender)
                let ID = JSON.stringify(Syain[i].id)

                //出力用にフォーマットを整える
                while (EmpNo.length < 4) {
                    EmpNo = "0" + EmpNo
                }

                if (BirthM < 10) {
                    BirthM = "0" + BirthM
                }
                if (BirthD < 10) {
                    BirthD = "0" + BirthD
                }

                let name = Nm1.replace(/\"/g, "") + "　" + Nm2.replace(/\"/g, "")
                let Birth = BirthY + "/" + BirthM + "/" + BirthD
                let Post = PostNo1.replace(/\"/g, "") + "-" + PostNo2.replace(/\"/g, "")
                let Adress = Adress1.replace(/\"/g, "") + "　" + Adress2.replace(/\"/g, "")
                //仮配列に1行ずつ格納
                TmpData[i] = [EmpNo, name, Birth, Gender, Post, Adress]
                CodeData[i] = [EmpNo, Nm1, Nm2, Nmk1, Nmk2, BirthY, BirthM, BirthD, Bumon, PostNo1, PostNo2, Adress1, Adress2, Tel1, Tel2, Tel3, Mail1, Mail2, Gender, ID]
                DelData[i] = [EmpNo, Nm1, Nm2, Nmk1, Nmk2, BirthY, BirthM, BirthD, Bumon, PostNo1, PostNo2, Adress1, Adress2, Tel1, Tel2, Tel3, Mail1, Mail2, Gender]
            }

            //昇順のメソッド
            TmpData.sort(function (a, b) {
                if (a[0] < b[0]) {
                    return -1;
                }
                if (a[0] > b[0]) {
                    return 1;
                }
                return 0;
            });

            //完成した仮配列をDataにSetする
            setData(TmpData.slice())
            
            setCode(CodeData.slice())
            /*CodeData.sort(function (a, b) {
                if (a[0] < b[0]) {
                    return -1;
                }
                if (a[0] > b[0]) {
                    return 1;
                }
                return 0;
            });*/
            setDel(DelData.slice())
        }
    }, [Syain]);
    

    const [No, setNo] = useState([])
    //画面遷移時のデータの受け渡しに使用する配列
    const [NoData, setNoData] = useState([])
    //画面遷移用配列に直接データをセットできなかったため仮の配列を作成。
    const TmpNoData = []

    //各処理に渡す用の配列作成（表示するデータのみを配列に格納）
    //第2引数が[Syain]の為、初回読み込み時と[Syain]に変更があった場合に処理が行われる。
    useEffect(() => {
        //社員のデータを取得後、変数に格納を行う
        if (No.length > 0) {
            for (let i = 0; i < No.length; i++) {
                //DBの各データを変数に格納する
                let ID = i + 1
                let EmpNo = JSON.stringify(No[i].empNo)
                let Nm1 = JSON.stringify(No[i].nm1)
                let Nm2 = JSON.stringify(No[i].nm2)

                //出力用にフォーマットを整える
                while (EmpNo.length < 4) {
                    EmpNo = "0" + EmpNo
                }

                let name = Nm1.replace(/\"/g, "") + "　" + Nm2.replace(/\"/g, "")
                let New = ""
                //仮配列に1行ずつ格納
                TmpNoData[i] = [ID, EmpNo, name,New]
            }

            //完成した仮配列をDataにSetする
            
            setNoData(TmpNoData.slice())
            /*TmpNoData.sort(function (a, b) {
                if (a[1] < b[1]) {
                    return -1;
                }
                if (a[1] > b[1]) {
                    return 1;
                }
                return 0;
            });*/
        }
    },[No]);
    //historyの取得
    const history = useHistory();

    return (
        { /* BrouserRouterにhistoryを追加 */ },
        <BrowserRouter history={history}>
            <div className="App">
                    <Switch>
                        { /* 社員一覧表示画面 */}
                    <Route exact path="/" component={EmpList}>
                            <EmpList dataList={Data} setDateChange={setDateChange} DateChange={DateChange} />
                    </Route>
                    <Route exact path="/EmpList" component={EmpList}>
                            <EmpList dataList={Data} setDateChange={setDateChange} DateChange={DateChange} />
                    </Route>

                        { /* 社員No変更画面 */}
                    <Route exact path="/EmpCodeChange" component={EmpCodeChange} >
                            <EmpCodeChange dataList={Code} mapDataList={NoData} setDateChange={setDateChange} DateChange={DateChange} />
                    </Route>

                        { /* 社員証再入力画面（入力） */}
                    <Route exact path="/EmpDet" component={EmpDet} >
                            <EmpDet dataList={Date} setDateChange={setDateChange} DateChange={DateChange} />
                    </Route>

                        { /* 社員証再入力画面（更新） */}
                    <Route exact path="/EmpDet/Upd" component={EmpDet} >
                            <EmpDet dataList={Date} setDateChange={setDateChange} DateChange={DateChange} />
                        </Route>
                </Switch>
            </div>
        </BrowserRouter>

    );
}

export default App;