package igrejavidanova.com.igrejavidanova.services.eventoObreiro;

import igrejavidanova.com.igrejavidanova.dto.eventoObreiro.EventoObreiroDTO;
import igrejavidanova.com.igrejavidanova.dto.eventoObreiro.ShowParticipacaoObreiroDTO;
import igrejavidanova.com.igrejavidanova.dto.member.ShowObreiroDTO;
import igrejavidanova.com.igrejavidanova.entities.EventoObreiroEntity;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.repository.EventoObreiroRepository;
import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetEventoObreiroService {
    private final EventoObreiroRepository eventoObreiroRepository;
    private final MemberRepository memberRepository;

    public List<EventoObreiroDTO> listaPorEvento(int id){
        List<EventoObreiroEntity> eventoObreiroEntityList = eventoObreiroRepository.findByEventoId(id);
        return retorno(eventoObreiroEntityList);
    }

    private List<EventoObreiroDTO> retorno(List<EventoObreiroEntity> eventoObreiroEntityList){
        return eventoObreiroEntityList.stream()
                .map(eventoObreiro -> EventoObreiroDTO.builder()
                        .id(eventoObreiro.getId())
                        .evento(eventoObreiro.getEvento())
                        .obreiro(eventoObreiro.getObreiro())
                        .funcao(eventoObreiro.getFuncao())
                        .build()).toList();
    }

    public List<ShowObreiroDTO> listaDeObreirosNaoRelacionados(int id){
        List<MemberEntity> obreiros = memberRepository.findObreirosNaoRelacionadosAoEvento(id);
        return retornoDeObreiros(obreiros);
    }

    private List<ShowObreiroDTO> retornoDeObreiros(List<MemberEntity> obreiros){
        return obreiros.stream()
                .map(obreiro -> ShowObreiroDTO.builder()
                        .id(obreiro.getId())
                        .nome(obreiro.getFullName())
                        .build())
                .toList();
    }

    public List<ShowParticipacaoObreiroDTO> listaDeParticipacoesObreiro(int id){
        int mesAtual = java.time.LocalDate.now().getMonthValue();
        List<EventoObreiroEntity> lista = eventoObreiroRepository.findByMonth(mesAtual, id);
        return listaDeParticipacoesObreirosDTO(lista);
    }

    private List<ShowParticipacaoObreiroDTO> listaDeParticipacoesObreirosDTO(List<EventoObreiroEntity> lista){
        return lista.stream()
                .map(evento -> ShowParticipacaoObreiroDTO.builder()
                        .tema(evento.getEvento().getTema())
                        .data(evento.getEvento().getData())
                        .funcaoEntity(evento.getFuncao().getNomeFuncao())
                        .build()).toList();
    }

}