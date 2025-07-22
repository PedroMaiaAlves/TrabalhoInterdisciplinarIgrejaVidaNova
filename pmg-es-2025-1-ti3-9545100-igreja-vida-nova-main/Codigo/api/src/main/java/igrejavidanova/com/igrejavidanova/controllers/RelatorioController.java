package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.entities.CerimoniaEntity;
import igrejavidanova.com.igrejavidanova.entities.DoacaoEntity;
import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.enums.EventType;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import igrejavidanova.com.igrejavidanova.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/relatorio")
@RequiredArgsConstructor
public class RelatorioController {

    private final EventoRepository eventoRepository;
    private final MemberRepository memberRepository;
    private final EventoObreiroRepository eventoObreiroRepository;
    private final DoacaoRepository doacaoRepository;
    private final CerimoniaRepository cerimoniaRepository;

    @GetMapping
    public void exportToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=relatorio.xlsx");

        Workbook workbook = new XSSFWorkbook();

        // Estilo para cabeçalho (negrito)
        CellStyle headerStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        headerStyle.setFont(font);

        // Formatter para data e hora
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        // =======================
        // 1️⃣ Aba Resumo Geral
        // =======================
        Sheet resumoSheet = workbook.createSheet("Resumo Geral");
        Row resumoHeader = resumoSheet.createRow(0);
        Cell cell0 = resumoHeader.createCell(0);
        cell0.setCellValue("Descrição");
        cell0.setCellStyle(headerStyle);
        Cell cell1 = resumoHeader.createCell(1);
        cell1.setCellValue("Quantidade");
        cell1.setCellStyle(headerStyle);

        resumoSheet.createRow(1).createCell(0).setCellValue("Total de Cultos");
        resumoSheet.getRow(1).createCell(1).setCellValue(eventoRepository.findAllByTipo(EventType.CULTO).stream().count());

        resumoSheet.createRow(2).createCell(0).setCellValue("Total de Visitas");
        resumoSheet.getRow(2).createCell(1).setCellValue(eventoRepository.findAllByTipo(EventType.VISITA).stream().count());

        resumoSheet.createRow(3).createCell(0).setCellValue("Total de Obreiros");
        resumoSheet.getRow(3).createCell(1).setCellValue(memberRepository.findAllByMemberType(MemberType.OBREIRO).stream().count());

        resumoSheet.createRow(4).createCell(0).setCellValue("Total de Cerimônias");
        resumoSheet.getRow(4).createCell(1).setCellValue(cerimoniaRepository.count());

        resumoSheet.createRow(5).createCell(0).setCellValue("Total de Membros");
        resumoSheet.getRow(5).createCell(1).setCellValue(memberRepository.findAllByMemberType(MemberType.MEMBRO).stream().count());

        double totalDoacoes = doacaoRepository.findAll()
                .stream()
                .mapToDouble(DoacaoEntity::getValorArrecadado)
                .sum();

        resumoSheet.createRow(6).createCell(0).setCellValue("Total Arrecadado nas Doações");
        resumoSheet.getRow(6).createCell(1).setCellValue(totalDoacoes);

        // =======================
        // 2️⃣ Aba Cultos
        // =======================
        Sheet cultoSheet = workbook.createSheet("Cultos");
        Row cultoHeader = cultoSheet.createRow(0);
        Cell cultoCell0 = cultoHeader.createCell(0);
        cultoCell0.setCellValue("Tema");
        cultoCell0.setCellStyle(headerStyle);
        Cell cultoCell1 = cultoHeader.createCell(1);
        cultoCell1.setCellValue("Data e Hora");
        cultoCell1.setCellStyle(headerStyle);

        List<EventoEntity> cultos = eventoRepository.findAllByTipo(EventType.CULTO);
        int cultoRow = 1;
        for (EventoEntity c : cultos) {
            Row row = cultoSheet.createRow(cultoRow++);
            row.createCell(0).setCellValue(c.getTema() != null ? c.getTema() : "");
            if (c.getData() != null) {
                row.createCell(1).setCellValue(c.getData().format(dateTimeFormatter));
            } else {
                row.createCell(1).setCellValue("");
            }
        }

        // =======================
        // 3️⃣ Aba Cerimônias
        // =======================
        Sheet cerimoniaSheet = workbook.createSheet("Cerimônias");
        Row cerimoniaHeader = cerimoniaSheet.createRow(0);
        cerimoniaHeader.createCell(0).setCellValue("Tipo");
        cerimoniaHeader.getCell(0).setCellStyle(headerStyle);
        cerimoniaHeader.createCell(1).setCellValue("Data");
        cerimoniaHeader.getCell(1).setCellStyle(headerStyle);
        cerimoniaHeader.createCell(2).setCellValue("Convidados");
        cerimoniaHeader.getCell(2).setCellStyle(headerStyle);
        cerimoniaHeader.createCell(3).setCellValue("Descrição");
        cerimoniaHeader.getCell(3).setCellStyle(headerStyle);

        List<CerimoniaEntity> cerimonias = cerimoniaRepository.findAll();
        int cerimoniaRow = 1;
        for (CerimoniaEntity c : cerimonias) {
            Row row = cerimoniaSheet.createRow(cerimoniaRow++);
            row.createCell(0).setCellValue(c.getCerimoniaType() != null ? c.getCerimoniaType().toString() : "");
            if (c.getData() != null) {
                row.createCell(1).setCellValue(c.getData().format(dateFormatter));
            } else {
                row.createCell(1).setCellValue("");
            }
            row.createCell(2).setCellValue(c.getQuantidadeConvidados());
            row.createCell(3).setCellValue(c.getDescricao() != null ? c.getDescricao() : "");
        }

        // =======================
        // 4️⃣ Aba Doações
        // =======================
        Sheet doacaoSheet = workbook.createSheet("Doações");
        Row doacaoHeader = doacaoSheet.createRow(0);
        doacaoHeader.createCell(0).setCellValue("Título da Doação");
        doacaoHeader.getCell(0).setCellStyle(headerStyle);
        doacaoHeader.createCell(1).setCellValue("Valor Arrecadado");
        doacaoHeader.getCell(1).setCellStyle(headerStyle);

        List<DoacaoEntity> doacoes = doacaoRepository.findAll();
        int doacaoRow = 1;
        for (DoacaoEntity d : doacoes) {
            Row row = doacaoSheet.createRow(doacaoRow++);
            row.createCell(0).setCellValue(d.getTitulo() != null ? d.getTitulo() : "");
            row.createCell(1).setCellValue(d.getValorArrecadado());
        }

        for (Sheet sheet : List.of(resumoSheet, cultoSheet, cerimoniaSheet, doacaoSheet)) {
            for (int i = 0; i < 4; i++) {
                sheet.autoSizeColumn(i);
            }
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}
