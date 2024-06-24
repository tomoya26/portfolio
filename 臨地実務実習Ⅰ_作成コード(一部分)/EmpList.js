import React from 'react'
import { Table } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

function EmpList(props) {
    const history = useHistory();
    function Max() {
        if (props.dataList.length + 1 > 3) {
            alert('登録可能件数が最大です。（最大件数：100件）');
        } else {
            window.location.href = '/EmpDet';
        }
    }

    return (
        <div className="col-md-8 offset-md-1">
            <br /><br />
            <h3>社員一覧</h3><br />


            <Table striped bordered hover responsive="md">
                <thead>
                    <tr className="table-primary">
                        <th>社員No</th>
                        <th>名前</th>
                        <th>生年月日</th>
                        <th>性別</th>
                        <th>郵便番号</th>
                        <th>住所</th>
                    </tr>
                </thead>
                <tbody>
                    {props.dataList.map((rowItems) => {
                        return (
                            <tr>
                                {rowItems.map((columnItem, index) => {
                                    switch (index) {
                                        case 0:
                                            const UpdLnk = "/EmpDet/Upd/?ID=" + (rowItems[0]) ;
                                            return (
                                                <td>
                                                    <a href={UpdLnk}>{columnItem}</a>
                                                </td>
                                            )
                                            break;
                                        case 3:
                                            //データベースでは1桁の数値で管理されているため表示用文字列にする（とってくる過程でString型になっている）
                                            if (columnItem == "1") {
                                                return <td> 男 </td>;
                                            }
                                            else if (columnItem == "2") {
                                                return <td> 女 </td>;
                                            }
                                            else {
                                                return <td> その他 </td>;
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
                <button
                    onClick={Max}> 新規追加</button>
                &nbsp;&nbsp;&nbsp;&nbsp;   
                <button
                    onClick={() => {
                        history.push('/EmpCodeChange');
                    }}
                >社員No変更</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        </div>
    )
}

export default EmpList;