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
* Object同士、またはJSON同士で中身を比較する方法をご教示いただけると助かります。
  main.jsの133～143行目で、KeyとValueをlocalStorage.setItemに格納、  
  HTMLへ表示しています。ですが、すでにlocalStorage上に全く同じ  
  内容のKeyがあった場合、localStorageのKey,Valueは上書きされてしまいます。  
　一方、HTMLは上書きせず表示されてしまうため、localStorageとHTML上に表示の  
  Key, Valueに差異が発生します。  
  差異をなくすために「Object同士、またはJSON同士を比較して、一致していれば、  
  143行目の実行しない」処理を行えば対処できると思いました。

## ④その他（感想、シェアしたいことなんでも）  
内部の処理で無駄に時間を費やしてしまい、HTMLの表示部分の整理、  
試合のスタッツ情報の出力まで対応したかったが手が回らなかった。  
下記、課題作成にあたって参考にしたサイトです。

* 天気の情報を外部APIで取得する方法  
<https://hiyo-code.com/openweathermap-api/>
<https://openweathermap.org/current>  
※指定した日時を取得したかったのですが、  
外部APIを実行した日時しか取得できなさそう。。。

* select要素の選択・取得・追加方法  
<https://www.sejuku.net/blog/44811>  

* クリックされたテーブルの位置（X行X列目）を取得する方法  
<https://thr3a.hatenablog.com/entry/20140904/1409819152>  

* appendChildによるフォームを追加  
<https://web-tsuku.life/add-form-appendchild/>  

* jQueryで特定文字列が含まれているか判定する方法  
<https://hajimete.org/jquery-tokutei-moziretu> 

* 忘れっぽい人のためのjQueryでよく使う関数逆引き  
https://qiita.com/maruyam-a/items/7643cb68e99f4ef925ea

* AWSのlamda関数の利用  
https://qiita.com/tamura_CD/items/46ba8a2f3bfd5484843f