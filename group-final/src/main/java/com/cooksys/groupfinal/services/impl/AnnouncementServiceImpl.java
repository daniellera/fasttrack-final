package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementMapper announcementMapper;
    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;

    @Override
    public void postAnnouncement(AnnouncementRequestDto announcementRequestDto)
    {
        long id = announcementRequestDto.getAuthor().getId();
        Optional<User> user = userRepository.findById(id);

        if(user.isPresent())
        {
            Announcement announcement = new Announcement();
            announcement.setAuthor(user.get());
            announcement.setTitle(announcementRequestDto.getTitle());
            announcement.setCompany(user.get().getCompanies().iterator().next());
            announcement.setMessage(announcementRequestDto.getMessage());
            announcementRepository.saveAndFlush(announcement);
        }
        //else
            //THROW
    }
}