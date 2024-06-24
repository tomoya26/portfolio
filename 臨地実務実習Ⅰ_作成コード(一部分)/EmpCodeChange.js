import { Table } from 'react-bootstrap'
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function EmpCodeChange(props) {

    const history = useHistory();
    const [No, setNo] = useState([])
    const NoData = []

    

    function usePutSyain() {
        //inputに入れたのを含めた社員Noすべてを格納
        let allcheck = false
        for (let a = 0; a < props.dataList.length; a++) {
            if (document.getElementById("ChangeEmpID" + (a + 1)).value != "") {
                let SetEmpNo = document.getElementById("ChangeEmpID" + (a + 1)).value
                SetEmpNo = ('0000' + SetEmpNo).slice(-4);
                NoData[a] = SetEmpNo
                allcheck = true
            } else {
                const SetEmpNo = props.dataList[a][0]
                NoData[a] = SetEmpNo
            }
        }
        if (allcheck == false) {
            return alert("変更したい社員Noを入力してください。");
        }
        //set関数を使い重複チェック
        const check = new Set(NoData);
        if ((check.size == NoData.length) == false) {
            return alert("社員Noは重複しないようにしてください。");
        }

        const result = window.confirm("入力した内容で更新します。よろしいですか。");
        if (result == true) {
            for (let n = 0; n < props.dataList.length; n++) {

                if (document.getElementById("ChangeEmpID" + (n + 1)).value != "") {

                    const SetEmpNo = document.getElementById("ChangeEmpID" + (n + 1)).value
                    const SetNm1 = props.dataList[n][1].replace(/\"/g, '');
                    const SetNm2 = props.dataList[n][2].replace(/\"/g, '');
                    const SetNmk1 = props.dataList[n][3].replace(/\"/g, '');
                    const SetNmk2 = props.dataList[n][4].replace(/\"/g, '');
                    const SetBirthY = props.dataList[n][5]
                    const SetBirthM = props.dataList[n][6]
                    const SetBirthD = props.dataList[n][7]
                    const SetBumon = props.dataList[n][8]
                    const SetPostNo1 = props.dataList[n][9].replace(/\"/g, '');
                    const SetPostNo2 = props.dataList[n][10].replace(/\"/g, '');
                    const SetAdress1 = props.dataList[n][11].replace(/\"/g, '');
                    const SetAdress2 = props.dataList[n][12].replace(/\"/g, '');
                    const SetTel1 = props.dataList[n][13].replace(/\"/g, '');
                    const SetTel2 = props.dataList[n][14].replace(/\"/g, '');
                    const SetTel3 = props.dataList[n][15].replace(/\"/g, '');
                    const SetMail1 = props.dataList[n][16].replace(/\"/g, '');
                    const SetMail2 = props.dataList[n][17].replace(/\"/g, '');
                    const SetGender = props.dataList[n][18]
                    const SetID = props.dataList[n][19].replace(/\"/g, '');

                    const UpdData = {
                        id: SetID,
                        empNo: SetEmpNo,
                        nm1: SetNm1,
                        nm2: SetNm2,
                        nmk1: SetNmk1,
                        nmk2: SetNmk2,
                        birthY: SetBirthY,
                        birthM: SetBirthM,
                        birthD: SetBirthD,
                        postNo1: SetPostNo1,
                        postNo2: SetPostNo2,
                        adress1: SetAdress1,
                        adress2: SetAdress2,
                        tel1: SetTel1,
                        tel2: SetTel2,
                        tel3: SetTel3,
                        mail1: SetMail1,
                        mail2: SetMail2,
                        gender: SetGender,
                        bumon: SetBumon,
                    }

                    Axios.put('api/users/PutUserList', UpdData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                        .then(() => {
                            console.log("then log");
                        })
                        .catch(() => {
                            console.log("catch log");
                        });
                }
            }
            alert("更新しました。");
            props.setDateChange(true)
            history.push('/EmpList');
        };
    }

    function backSyain() {
        const result = window.confirm("現在の入力内容は破棄されます。よろしいですか。");
        if (result == true) {
            history.push('/EmpList');
        }
    }
        
       

        

    return (
        <div className="col-md-8 offset-md-1">
            <br/><br/>
            <h3>社員No変更</h3><br/>

            <Table striped bordered hover responsive="md">
                <thead>
                    <tr className="table-primary">
                        <th>No</th>
                        <th>現在</th>
                        <th>氏名</th>
                        <th>変更後</th>
                    </tr>
                </thead>
                <tbody>
                    {props.mapDataList.map((rowItems) => {
                        return (
                            <tr>
                                {rowItems.map((columnItem, index) => {
                                    switch (index) {
                                        case 3:
                                            if (columnItem === "") {
                                                //行数を特定できるように、一意な値を作成（ChangeEmpID　＋　"行番号(1からの連番)")
                                                const i = "ChangeEmpID" + rowItems[0];
                                                { console.log(i)}
                                                return <td><input className='itemspace' type="text" id={i} name="tCode" size="20" maxLength="4" /></td>;
                                            }
                                            else {
                                                return <td> <input className='itemspace' type="text" id="New" name="tCode" size="20" maxLength="4" /> </td>;
                                            }
                                            break;
                                        default:
                                            return <td> {columnItem} </td>;
                                            break;
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <div align="right">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button id='UpdBtn' onClick={usePutSyain}>
                    更新
                </button>

                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={backSyain}>キャンセル</button>

            </div>
        </div>
    )
}

export default EmpCodeChange;