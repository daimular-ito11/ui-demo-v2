/*
    input id="" data-role="zip-search_input"
    input id="prefecture"
    input id="city"
    input id="street"
    button type="button" data-role="zip-search_btn"
    span class="error" id="js-zip_error"
*/


const ZIPADRESSsearch = document.querySelector('[data-role="zip-search_input"]');
const ZIPADRESSsearchBtn = document.querySelector('[data-role="zip-search_btn"');
const ZIPADRESSpref = document.querySelector('#prefecture');
const ZIPADRESScity = document.querySelector('#city');
const ZIPADRESSstreet = document.querySelector('#street');
const ZIPADRESSerror = document.querySelector('#js-zip_error');

const ZIPADRESSbaseURL = 'https://api.zipaddress.net/';
var ZIPADRESSsearchValue = '';
var ZIPADRESSerrorValue = '';

if (ZIPADRESSsearch && ZIPADRESSsearchBtn) {
    ZIPADRESSsearch.addEventListener('input', ZIPADRESSsetsearchValue);
    ZIPADRESSsearchBtn.addEventListener('click', ZIPADRESSsearchStart);
}

// APIリクエスト
async function ZIPADRESSfetchData() {
    const url = `${ZIPADRESSbaseURL}?zipcode=${ZIPADRESSsearchValue}`;
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res.code !== 200) {
                return { data: res.message, error: true }
            }
            return { data: res.data, error: false }
        });
}

// 検索ボタンの挙動制御
function ZIPADRESSsetsearchValue(e) {
    const value = e.target.value;
    ZIPADRESSsearchBtn.disabled = true;
    ZIPADRESSerrorValue = '';
    if (value.length === 7) {
        ZIPADRESSsearchValue = value;
        ZIPADRESSsearchBtn.disabled = false;
    } else if (value.length != 0) {
        ZIPADRESSerrorValue = "7桁の数字を入力してください。";
    }
    ZIPADRESSdisplayerror();
}

// 検索開始
async function ZIPADRESSsearchStart() {
    if (ZIPADRESSsearchValue.length === 7) {
        const result = await ZIPADRESSfetchData();
        if (result.error) {
            ZIPADRESSerrorValue = result.data;
            ZIPADRESSdisplayerror();
            return;
        }
        ZIPADRESSpref.value = ZIPADDRESSprefectureDatas[result.data.pref] ??= '';
        ZIPADRESScity.value = result.data.city;
        ZIPADRESSstreet.value = result.data.town;
    }
}

// エラーの表示
function ZIPADRESSdisplayerror() {
    ZIPADRESSerror.textContent = ZIPADRESSerrorValue;
}

const ZIPADDRESSprefectureDatas = {
    "北海道": 1,
    "青森県": 2,
    "岩手県": 3,
    "宮城県": 4,
    "秋田県": 5,
    "山形県": 6,
    "福島県": 7,
    "茨城県": 8,
    "栃木県": 9,
    "群馬県": 10,
    "埼玉県": 11,
    "千葉県": 12,
    "東京都": 13,
    "神奈川県": 14,
    "新潟県": 15,
    "富山県": 16,
    "石川県": 17,
    "福井県": 18,
    "山梨県": 19,
    "長野県": 20,
    "岐阜県": 21,
    "静岡県": 22,
    "愛知県": 23,
    "三重県": 24,
    "滋賀県": 25,
    "京都府": 26,
    "大阪府": 27,
    "兵庫県": 28,
    "奈良県": 29,
    "和歌山県": 30,
    "鳥取県": 31,
    "島根県": 32,
    "岡山県": 33,
    "広島県": 34,
    "山口県": 35,
    "徳島県": 36,
    "香川県": 37,
    "愛媛県": 38,
    "高知県": 39,
    "福岡県": 40,
    "佐賀県": 41,
    "長崎県": 42,
    "熊本県": 43,
    "大分県": 44,
    "宮崎県": 45,
    "鹿児島県": 46,
    "沖縄県": 47,
};
