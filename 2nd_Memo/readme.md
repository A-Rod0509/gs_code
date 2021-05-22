# テニスノート  
## ①課題内容（どんな作品か）-必要あれば操作方法等こちらに記載  
テニスノートアプリを作成しました。  
記入した試合結果をlocalstrage上に保存します。  
「編集」ボタンを押すことで保存済の内容から編集することができます。  

## ②工夫した点・こだわった点  
* 外部APIを用いて情報入力の手間を削減。  
* lamda関数でテニスコートの情報を追加(できなかった)  

## ③質問・疑問（あれば）
* AWS上でlamda関数を作成することはできたが、URLに対し、  
　GETメソッドを実行してもMLHttpRequestがブロックされてしまい、  
　値を取得できませんでした。ご教示いただければ助かります。  

## ④その他（感想、シェアしたいことなんでも）  
内部の処理で手間取ってしまい、HTMLの表示部分の整理、  
試合のスタッツ情報の出力まで対応したかったが手が回らなかった。  
下記、課題作成にあたって参考にしたサイトです。

* 天気の情報を外部APIで取得する方法  
<https://hiyo-code.com/openweathermap-api/>
<https://openweathermap.org/current>  
※指定した日時の情報を取得したかったのですが、
　外部APIが実行された日時しか取得できなさそう。。。

* select要素の選択・取得・追加方法  
<https://www.sejuku.net/blog/44811>  

* クリックされたテーブルの位置（X行X列目）を取得する方法  
<https://thr3a.hatenablog.com/entry/20140904/1409819152>  

* appendChildによるフォームを追加  
<https://web-tsuku.life/add-form-appendchild/>  

* jQueryで特定文字列が含まれているか判定する方法  
<https://hajimete.org/jquery-tokutei-moziretu>  

* AWSのlamda関数の利用  
https://qiita.com/tamura_CD/items/46ba8a2f3bfd5484843f
