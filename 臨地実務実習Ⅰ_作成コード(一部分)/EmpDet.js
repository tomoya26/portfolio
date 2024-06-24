import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { useHistory, Switch, Route } from "react-router-dom";
import EmpList from './EmpList.js';
export let UpdID;

function EmpDet(props) {

	function IDData() {
		let Info = -1;
		for (let i = 0; i < Syain.length; i++) {
			if (Num == Syain[i].empNo) {
				Info = i;
				return Info;
			}
		}
	};
	//一覧に戻る用
	const history = useHistory();
	//URLを取得する
	let url = new URL(window.location.href);
	// URLSearchParamsオブジェクトを取得(URLの後ろにあるパラメータ）
	let getparam = url.searchParams;
	//上記から登録番号を取得する
	let Num = getparam.get('ID');

	//DBから持ってきたもの格納用
	const [Syain, setSyain] = useState([])
	const [No, setNo] = useState([])
	const NoData = []

	useEffect(() => {

		Axios.get('api/users')

		.then((res) => {
			setSyain(res.data)
		}, [])

		.catch(() => {
				console.log("catch log");
		})
	}, [])

	//データ降順にして最大No+1にする処理
	Syain.sort(function (a, b) {
		if (a.empNo < b.empNo) {
			return 1;
		}
		if (a.empNo > b.empNo) {
			return -1;
		}
		return 0;
	});
	//データを表示させるための処理
	useEffect(() => {
		if (Syain.length > 0) {

			let EmpNo = JSON.stringify(Syain[0].empNo)
			let New = Number(EmpNo) + 1
			let NewID = ('0000' + New).slice(-4);
			


			//ここのgetElementById(～～)の～～内容は下のinputタグ内に記載されているidと対応します
			if (Num == null) {
				document.getElementById("EmpID").value = NewID
				document.getElementById("Nm1").value = ""
				document.getElementById("Nm2").value = ""
				document.getElementById("Nmk1").value =""
				document.getElementById("Nmk2").value = ""
				document.getElementById("BirthY").value = ""
				document.getElementById("BirthM").value = ""
				document.getElementById("BirthD").value = ""
				document.getElementById("Bumon").value = "1"
				document.getElementById("PostNo1").value = ""
				document.getElementById("PostNo2").value = ""
				document.getElementById("Adress1").value = ""
				document.getElementById("Adress2").value = ""
				document.getElementById("Tel1").value = ""
				document.getElementById("Tel2").value = ""
				document.getElementById("Tel3").value = ""
				document.getElementById("Mail1").value = ""
				document.getElementById("Mail2").value = ""
				document.getElementById("Man").checked = true
			} else {
				let Data = IDData();
					//DBの各データを変数に格納する
				let Nm1 = JSON.stringify(Syain[Data].nm1)
				let Nm2 = JSON.stringify(Syain[Data].nm2)
				let Nmk1 = JSON.stringify(Syain[Data].nmk1)
				let Nmk2 = JSON.stringify(Syain[Data].nmk2)
				let BirthY = JSON.stringify(Syain[Data].birthY)
				let BirthM = JSON.stringify(Syain[Data].birthM)
				let BirthD = JSON.stringify(Syain[Data].birthD)
				let Bumon = JSON.stringify(Syain[Data].bumon)
				let PostNo1 = JSON.stringify(Syain[Data].postNo1)
				let PostNo2 = JSON.stringify(Syain[Data].postNo2)
				let Adress1 = JSON.stringify(Syain[Data].adress1)
				let Adress2 = JSON.stringify(Syain[Data].adress2)
				let Tel1 = JSON.stringify(Syain[Data].tel1)
				let Tel2 = JSON.stringify(Syain[Data].tel2)
				let Tel3 = JSON.stringify(Syain[Data].tel3)
				let Mail1 = JSON.stringify(Syain[Data].mail1)
				let Mail2 = JSON.stringify(Syain[Data].mail2)
				let Gender = JSON.stringify(Syain[Data].gender)

				Nm1 = Nm1.replace(/\"/g, '');
				Nm2 = Nm2.replace(/\"/g, '');
				Nmk1 = Nmk1.replace(/\"/g, '');
				Nmk2 = Nmk2.replace(/\"/g, '');
				PostNo1 = PostNo1.replace(/\"/g, '');
				PostNo2 = PostNo2.replace(/\"/g, '');
				Adress1 = Adress1.replace(/\"/g, '');
				Adress2 = Adress2.replace(/\"/g, '');
				Tel1 = Tel1.replace(/\"/g, '');
				Tel2 = Tel2.replace(/\"/g, '');
				Tel3 = Tel3.replace(/\"/g, '');
				Mail1 = Mail1.replace(/\"/g, '');
				Mail2 = Mail2.replace(/\"/g, '');

				document.getElementById("EmpID").value = Num
				document.getElementById("Nm1").value = Nm1
				document.getElementById("Nm2").value = Nm2
				document.getElementById("Nmk1").value = Nmk1
				document.getElementById("Nmk2").value = Nmk2
				if (BirthY == 0) {
					document.getElementById("BirthY").value = ""
				} else {
					document.getElementById("BirthY").value = BirthY
                }
				if (BirthM == 0) {
					document.getElementById("BirthM").value = ""
				} else {
					document.getElementById("BirthM").value = BirthM
				}
				if (BirthD == 0) {
					document.getElementById("BirthD").value = ""
				} else {
					document.getElementById("BirthD").value = BirthD
				}
				document.getElementById("Bumon").value = Bumon
				document.getElementById("PostNo1").value = PostNo1
				document.getElementById("PostNo2").value = PostNo2
				document.getElementById("Adress1").value = Adress1
				document.getElementById("Adress2").value = Adress2
				document.getElementById("Tel1").value = Tel1
				document.getElementById("Tel2").value = Tel2
				document.getElementById("Tel3").value = Tel3
				document.getElementById("Mail1").value = Mail1
				document.getElementById("Mail2").value = Mail2
				if (Gender == 1) {
					document.getElementById("Man").checked = true
				} else if (Gender == 2) {
					document.getElementById("Woman").checked = true
				} else {
					document.getElementById("Others").checked = true
				}
			}
        }
	}, [Syain])
	

	//usePostSyain(データの新規追加)
	function usePostSyain() {
		//登録済みの社員Noすべてを格納
		for (let a = 0; a < Syain.length; a++) {
			if (Syain[a].empNo == document.getElementById("EmpID").value) {
				return alert("社員Noは重複しないようにしてください。");
            }
		}

		if (document.getElementById("EmpID").value == "") {
			return alert("社員Noが入力されていません。");
		} else if (document.getElementById("Nm1").value == "") {
			return alert("名前（姓）が入力されていません。");
		} else if (document.getElementById("Nm2").value == "") {
			return alert("名前（名）が入力されていません。");
		}

		const y = document.getElementById("BirthY").value;
		const m = document.getElementById("BirthM").value;
		const d = document.getElementById("BirthD").value;
		if (y != "" || m != "" || d != "") {
			const date = new Date(y, m - 1, d);
			const month = date.getMonth() + 1;
			const time = Date.now();
			if (m != month || date.getTime() > time) {
				return alert("正しい生年月日が入力されていません。");
			}
		}

		const result = window.confirm("この内容で新規登録します。よろしいですか。");
		if (result == true) {
			var SetGender
			if (document.getElementById("Man").checked == true) {
				SetGender = 1
			}
			else if (document.getElementById("Woman").checked == true) {
				SetGender = 2
			}
			else {
				SetGender = 3
			};

			let SetEmpNo = document.getElementById("EmpID").value
			let SetNm1 = document.getElementById("Nm1").value
			let SetNm2 = document.getElementById("Nm2").value
			let SetNmk1 = document.getElementById("Nmk1").value
			let SetNmk2 = document.getElementById("Nmk2").value
			let SetBirthY = document.getElementById("BirthY").value
			let SetBirthM = document.getElementById("BirthM").value
			let SetBirthD = document.getElementById("BirthD").value
			let SetPostNo1 = document.getElementById("PostNo1").value
			let SetPostNo2 = document.getElementById("PostNo2").value
			let SetAdress1 = document.getElementById("Adress1").value
			let SetAdress2 = document.getElementById("Adress2").value
			let SetTel1 = document.getElementById("Tel1").value
			let SetTel2 = document.getElementById("Tel2").value
			let SetTel3 = document.getElementById("Tel3").value
			let SetMail1 = document.getElementById("Mail1").value
			let SetMail2 = document.getElementById("Mail2").value
			let SetBumon = document.getElementById("Bumon").value

			if (SetBirthY == "" && SetBirthM == "" && SetBirthD == "") {
				SetBirthY = 0;
			    SetBirthM  = 0;
				SetBirthD = 0;
            }
			

			const SetData = {
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

			Axios.post('api/users/PostUserList', SetData, {
				headers: {
					'Content-Type': 'application/json'
				}
			})

				.then(() => {
					console.log("then log");
				})
				//通信失敗時
				.catch(() => {
					console.log("catch log");
				});
			alert("新規追加しました。");
			props.setDateChange(true)
			history.push('/EmpList');
		}
	}
		

	//usePutSyain(データの更新)
	function usePutSyain() {

		for (let a = 0; a < Syain.length; a++) {
			let Data = IDData();
			if (Data == a) {
				continue;
			} else if (Syain[a].empNo == document.getElementById("EmpID").value) {
				return alert("社員Noは重複しないようにしてください。");
			}
		}

		if (document.getElementById("EmpID").value == "") {
			return alert("社員Noは必ず入力してください。");
		} else if (document.getElementById("Nm1").value == "") {
			return alert("名前（姓）は必ず入力してください。");
		} else if (document.getElementById("Nm2").value == "") {
			return alert("名前（名）は必ず入力してください。");
		}

		const y = document.getElementById("BirthY").value;
		const m = document.getElementById("BirthM").value;
		const d = document.getElementById("BirthD").value;
		if (y != "" || m != "" || d != "") {
			const date = new Date(y, m - 1, d);
			const month = date.getMonth() + 1;
			const time = Date.now();
			if (m != month || date.getTime() > time) {
				return alert("正しい生年月日が入力されていません。");
			}
		}

		const result = window.confirm("この内容で更新します。よろしいですか。");
		if (result == true) {
			var SetGender
			if (document.getElementById("Man").checked == true) {
				SetGender = 1
			}
			else if (document.getElementById("Woman").checked == true) {
				SetGender = 2
			}
			else {
				SetGender = 3
			};
			let Data = IDData(Num);
			let number = Syain[Data].id
			let SetEmpNo = document.getElementById("EmpID").value
			let SetNm1 = document.getElementById("Nm1").value
			let SetNm2 = document.getElementById("Nm2").value
			let SetNmk1 = document.getElementById("Nmk1").value
			let SetNmk2 = document.getElementById("Nmk2").value
			let SetBirthY = document.getElementById("BirthY").value
			let SetBirthM = document.getElementById("BirthM").value
			let SetBirthD = document.getElementById("BirthD").value
			let SetPostNo1 = document.getElementById("PostNo1").value
			let SetPostNo2 = document.getElementById("PostNo2").value
			let SetAdress1 = document.getElementById("Adress1").value
			let SetAdress2 = document.getElementById("Adress2").value
			let SetTel1 = document.getElementById("Tel1").value
			let SetTel2 = document.getElementById("Tel2").value
			let SetTel3 = document.getElementById("Tel3").value
			let SetMail1 = document.getElementById("Mail1").value
			let SetMail2 = document.getElementById("Mail2").value
			let SetBumon = document.getElementById("Bumon").value

			if (SetBirthY == "" && SetBirthM == "" && SetBirthD == "") {
				SetBirthY = 0;
				SetBirthM = 0;
				SetBirthD = 0;
			}

			const UpdData = {
				id: number,
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
			alert("更新しました。");
			props.setDateChange(true)
			history.push('/EmpList');
		}
	}

	//useDeleteSyain(データの削除)
	function useDeleteSyain() {
		const result = window.confirm("削除したデータは元には戻りません。本当に削除しますか。");
		if (result == true) {
			var DelGender
			if (document.getElementById("Man").checked == true) {
				DelGender = 1
			}
			else if (document.getElementById("Woman").checked == true) {
				DelGender = 2
			}
			else {
				DelGender = 3
			};

			let Data = IDData();
			const number = Syain[Data].id
			const DelEmpNo = "1"
			const DelNm1 = "1"
			const DelNm2 = "1"
			const DelNmk1 = "1"
			const DelNmk2 = "1"
			const DelBirthY = "1"
			const DelBirthM = "1"
			const DelBirthD = "1"
			const DelPostNo1 = "1"
			const DelPostNo2 = "1"
			const DelAdress1 = "1"
			const DelAdress2 = "1"
			const DelTel1 = "1"
			const DelTel2 = "1"
			const DelTel3 = "1"
			const DelMail1 = "1"
			const DelMail2 = "1"
			const DelBumon = "1"


			const DelData = {
				id: number,
				empNo: DelEmpNo,
				nm1: DelNm1,
				nm2: DelNm2,
				nmk1: DelNmk1,
				nmk2: DelNmk2,
				birthY: DelBirthY,
				birthM: DelBirthM,
				birthD: DelBirthD,
				postNo1: DelPostNo1,
				postNo2: DelPostNo2,
				adress1: DelAdress1,
				adress2: DelAdress2,
				tel1: DelTel1,
				tel2: DelTel2,
				tel3: DelTel3,
				mail1: DelMail1,
				mail2: DelMail2,
				gender: DelGender,
				bumon: DelBumon,
			}

			Axios.delete('api/users/DeleteUserList', { data: DelData })
				.then(() => {
					console.log("then log");
				})
				.catch(() => {
					console.log("catch log");
				});
			alert("削除しました。");
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
		<div style={{ marginLeft: '10px' }}>
			<h1>社員詳細入力画面</h1>

			<div className='container1'>
				<div className='item' id='required'><label>担当者コード</label></div>
				<input className='itemspace' type="text" id='EmpID' name="tCode" size="20" maxLength="4" />
			</div>
			<div className='container2'>
				<div className='item' id='required'><label>名前</label></div>
				<span style={{ width: '35px', paddingLeft: '5px' }}>姓</span>
				<input className='itemspace' type="text" id='Nm1' name="tCode" size="20" maxLength="10" placeholder="(例) 田中"/>
				<span style={{ width: '35px', paddingLeft: '25px' }}>名</span>
				<input className='itemspace' type="text" id='Nm2' name="tCode" size="20" maxLength="10" placeholder="(例) 太郎"/>
			</div>
			<div className='container1'>
				<div className='item'><label>名前フリガナ</label></div>
				<span style={{ width: '35px', paddingLeft: '5px' }}>セイ</span>
				<input className='itemspace' type="text" id='Nmk1' name="tCode" size="20" maxLength="16" placeholder="(例) タナカ" />
				<span style={{ width: '35px', paddingLeft: '25px' }}>メイ</span>
				<input className='itemspace' type="text" id='Nmk2' name="tCode" size="20" maxLength="16" placeholder="(例) タロウ" />
			</div>
			<div className='container2'>
				<div className='item'><label>性別</label></div>
				<label>
					<input
						name="SetG"
						type="radio"
						value="男性"
						id='Man'
						onChange=""
					/>
					男性
				</label>
				<label className='itemspace'>
					<input
						name="SetG"
						type="radio"
						value="女性"
						id='Woman'
						onChange=""
					/>
					女性
				</label>
				<label className='itemspace'>
					<input
						name="SetG"
						type="radio"
						value="その他"
						id='Others'
						onChange=""
					/>
					その他
				</label>
			</div>
			<div className='container1'>
				<div className='item'><label>生年月日</label></div>
				<input className='itemspace' type="text" id='BirthY' name="tCode" size="5" maxLength="4" placeholder="(例) 2000" />
				<span className='itemspace'>年</span>
				<input className='itemspace' type="text" id='BirthM' name="tCode" size="2" maxLength="2" placeholder="(例) 1" />
				<span className='itemspace'>月</span>
				<input className='itemspace' type="text" id='BirthD' name="tCode" size="2" maxLength="2" placeholder="(例) 1" />
				<span className='itemspace'>日</span>
			</div>
			<div className='container2'>
				<div className='item' id='required'><label>部門名</label></div>
				<select className='itemspace' id='Bumon' style={{ height: '25px' }} onChange="">
					<option value="1">第一製品開発部</option>
					<option value="2">第二製品開発部</option>
					<option value="3">製品企画開発部</option>
					<option value="4">開発統括部</option>
				</select>
			</div>
			<div className='container1'>
				<div className='item'><label>郵便番号</label></div>
				<span className='itemspace'>〒</span>
				<input className='itemspace' type="text" id='PostNo1' name="tCode" size="4" maxLength="3" placeholder="(例) 999" />
				<span className='itemspace'>-</span>
				<input className='itemspace' type="text" id='PostNo2' name="tCode" size="5" maxLength="4" placeholder="(例) 7777" />
			</div>
			<div className='container2'>
				<div className='item'><label>住所1</label></div>
				<input className='itemspace' type="text" id='Adress1' name="tCode" size="80" maxLength="40" placeholder="(例) 山形県山形市" />
			</div>
			<div className='container1'>
				<div className='item'><label>住所2</label></div>
				<input className='itemspace' type="text" id='Adress2' name="tCode" size="80" maxLength="40" placeholder="(例) テストビル三階" />
			</div>
			<div className='container2'>
				<div className='item'><label>電話番号</label></div>
				<input className='itemspace' type="text" id='Tel1' name="tCode" size="3" maxLength="4" placeholder="(例) 090" />
				<span className='itemspace'>-</span>
				<input className='itemspace' type="text" id='Tel2' name="tCode" size="4" maxLength="4" placeholder="(例) 1234" />
				<span className='itemspace'>-</span>
				<input className='itemspace' type="text" id='Tel3' name="tCode" size="4" maxLength="4" placeholder="(例) 5678" />
			</div>
			<div className='container1'>
				<div className='item'><label>e-mail</label></div>
				<input className='itemspace' type="text" id='Mail1' name="tCode" size="22" maxLength="40" placeholder="(例) taro_tanaka" />
				<span className='itemspace'>@</span>
				<input className='itemspace' type="text" id='Mail2' name="tCode" size="22" maxLength="40" placeholder="(例) gmail.test" />
			</div>

			<div className='containerend'>
				<Switch>
					<Route exact path="/EmpDet">
						<Route exact path=" /" component={EmpList} />
						<button id='InsBtn' onClick={usePostSyain}>
							追加
						</button>
						<button id='RetBtn' onClick={backSyain}>
							社員一覧へ戻る
						</button>
					</Route>

					<Route exact path="/EmpDet/Upd">
						<button id='UpdBtn' onClick={usePutSyain}>
							更新
						</button>
						<button id='DelBtn' onClick={useDeleteSyain}>
							削除
						</button>
						<button id='RetBtn' onClick={backSyain}>
							社員一覧へ戻る
						</button>
					</Route>
				</Switch>
			</div>

		</div>
	);
}

export default EmpDet