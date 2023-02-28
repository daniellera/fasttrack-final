package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import java.util.HashSet;
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
public class CompanyMapperImpl implements CompanyMapper {

    @Autowired
    private TeamMapper teamMapper;
    @Autowired
    private BasicUserMapper basicUserMapper;

    @Override
    public CompanyDto entityToDto(Company company) {
        if ( company == null ) {
            return null;
        }

        CompanyDto companyDto = new CompanyDto();

        companyDto.setId( company.getId() );
        companyDto.setName( company.getName() );
        companyDto.setDescription( company.getDescription() );
        companyDto.setTeams( teamMapper.entitiesToDtos( company.getTeams() ) );
        companyDto.setEmployees( basicUserMapper.entitiesToBasicUserDtos( company.getEmployees() ) );

        return companyDto;
    }

    @Override
    public Set<CompanyDto> entitiesToDtos(Set<Company> companies) {
        if ( companies == null ) {
            return null;
        }

        Set<CompanyDto> set = new HashSet<CompanyDto>( Math.max( (int) ( companies.size() / .75f ) + 1, 16 ) );
        for ( Company company : companies ) {
            set.add( entityToDto( company ) );
        }

        return set;
    }

    @Override
    public Company dtoToEntity(CompanyDto companyDto) {
        if ( companyDto == null ) {
            return null;
        }

        Company company = new Company();

        company.setId( companyDto.getId() );
        company.setName( companyDto.getName() );
        company.setDescription( companyDto.getDescription() );
        company.setEmployees( basicUserDtoSetToUserSet( companyDto.getEmployees() ) );
        company.setTeams( teamDtoSetToTeamSet( companyDto.getTeams() ) );

        return company;
    }

    protected Profile profileDtoToProfile(ProfileDto profileDto) {
        if ( profileDto == null ) {
            return null;
        }

        Profile profile = new Profile();

        profile.setFirstName( profileDto.getFirstName() );
        profile.setLastName( profileDto.getLastName() );
        profile.setEmail( profileDto.getEmail() );
        profile.setPhone( profileDto.getPhone() );

        return profile;
    }

    protected User basicUserDtoToUser(BasicUserDto basicUserDto) {
        if ( basicUserDto == null ) {
            return null;
        }

        User user = new User();

        user.setId( basicUserDto.getId() );
        user.setProfile( profileDtoToProfile( basicUserDto.getProfile() ) );
        user.setActive( basicUserDto.isActive() );
        user.setAdmin( basicUserDto.isAdmin() );
        user.setStatus( basicUserDto.getStatus() );

        return user;
    }

    protected Set<User> basicUserDtoSetToUserSet(Set<BasicUserDto> set) {
        if ( set == null ) {
            return null;
        }

        Set<User> set1 = new HashSet<User>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( BasicUserDto basicUserDto : set ) {
            set1.add( basicUserDtoToUser( basicUserDto ) );
        }

        return set1;
    }

    protected Set<Team> teamDtoSetToTeamSet(Set<TeamDto> set) {
        if ( set == null ) {
            return null;
        }

        Set<Team> set1 = new HashSet<Team>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( TeamDto teamDto : set ) {
            set1.add( teamMapper.dtoToEntity( teamDto ) );
        }

        return set1;
    }
}
