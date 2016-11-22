package parsingExcel.poiExecl;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by 张雪冬 on 2016/11/22.
 */
public class PoiCreateExcel {
    public static void main(String[] args) {
        String [] title={"id","name","sex"};
        //创建工作簿
        HSSFWorkbook hssfBook= new HSSFWorkbook();
        //创建一个工作表sheet
        HSSFSheet sheet=hssfBook.createSheet();
        //创建第一行
        HSSFRow row=sheet.createRow(0);
        HSSFCell cell=null;
        //第一列设置列名
        for(int i=0;i<title.length;i++){
            cell=row.createCell(i);
            cell.setCellValue(title[i]);
        }
        //追加数据
        for(int i=1;i<11;i++){
            HSSFRow content =sheet.createRow(i);
            cell=content.createCell(0);
            cell.setCellValue("a"+i);
            cell=content.createCell(1);
            cell.setCellValue("user"+i);
            cell=content.createCell(2);
            cell.setCellValue("12345"+i);
        }
        //创建excel文件
        File file=new File("poiText.xls");
        try {
            //在项目中
            file.createNewFile();
            FileOutputStream stream=new FileOutputStream(file);
            //写入数据
            hssfBook.write(stream);
            //关闭流
            stream.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
