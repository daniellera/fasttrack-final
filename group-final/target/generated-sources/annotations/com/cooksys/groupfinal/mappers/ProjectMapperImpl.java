package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.entities.Project;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-28T11:31:49-0800",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 17.0.5 (Eclipse Adoptium)"
)
@Component
public class ProjectMapperImpl implements ProjectMapper {

    @Autowired
    private TeamMapper teamMapper;

    @Override
    public ProjectDto entityToDto(Project project) {
        if ( project == null ) {
            return null;
        }

        ProjectDto projectDto = new ProjectDto();

        projectDto.setId( project.getId() );
        projectDto.setName( project.getName() );
        projectDto.setDescription( project.getDescription() );
        projectDto.setActive( project.isActive() );
        projectDto.setTeam( teamMapper.entityToDto( project.getTeam() ) );

        return projectDto;
    }

    @Override
    public Set<ProjectDto> entitiesToDtos(Set<Project> projects) {
        if ( projects == null ) {
            return null;
        }

        Set<ProjectDto> set = new HashSet<ProjectDto>( Math.max( (int) ( projects.size() / .75f ) + 1, 16 ) );
        for ( Project project : projects ) {
            set.add( entityToDto( project ) );
        }

        return set;
    }

    @Override
    public List<ProjectDto> entitiesToDtos(List<Project> projects) {
        if ( projects == null ) {
            return null;
        }

        List<ProjectDto> list = new ArrayList<ProjectDto>( projects.size() );
        for ( Project project : projects ) {
            list.add( entityToDto( project ) );
        }

        return list;
    }

    @Override
    public Project requestDtoToEntity(ProjectRequestDto projectRequestDto) {
        if ( projectRequestDto == null ) {
            return null;
        }

        Project project = new Project();

        project.setName( projectRequestDto.getName() );
        project.setDescription( projectRequestDto.getDescription() );
        project.setActive( projectRequestDto.isActive() );

        return project;
    }
}
