<?php

namespace App\Controller;

use App\Entity\JobTitle;
use App\Repository\JobTitleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/job_title')]
final class JobTitleController extends AbstractController
{
    /**
     * @param JobTitleRepository $jobTitleRepository
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    #[Route('/', name: 'job_title_list', methods: ['GET'])]
    public function getJobTitles(JobTitleRepository $jobTitleRepository, SerializerInterface $serializer): JsonResponse
    {
        $jobTitleList = $jobTitleRepository->findAll();
        $jsonJobTitleList = $serializer->serialize($jobTitleList, 'json',['groups' => ['job_title']]);
        return new JsonResponse($jsonJobTitleList, Response::HTTP_OK, [], true);
    }

    /**
     * @param JobTitle $jobTitle
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    #[Route('/{id}', name: 'job_title_detail', methods: ['GET'])]
    public function getJobTitleDetail(JobTitle $jobTitle, SerializerInterface $serializer): JsonResponse
    {
        $JobTitle = $serializer->serialize($jobTitle, 'json',['groups' => ['job_title']]);
        return new JsonResponse($JobTitle, Response::HTTP_OK, [], true);
    }

    /**
     * @param JobTitle $jobTitle
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    #[Route('/{id}', name: 'job_title_delete', methods: ['DELETE'])]
    public function deleteJobTitle(JobTitle $jobTitle, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($jobTitle);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }


    /**
     * @param Request $request
     * @param SerializerInterface $serializer
     * @param EntityManagerInterface $em
     * @param UrlGeneratorInterface $urlGenerator
     * @return JsonResponse
     */
    #[Route('/', name: "job_title_create", methods: ['POST'])]
    public function createJobTitle(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse
    {

        $jobTitle = $serializer->deserialize($request->getContent(), JobTitle::class, 'json',['groups' => ['job_title']]);
        $em->persist($jobTitle);
        $em->flush();

        $jsonJobTitle = $serializer->serialize($jobTitle, 'json',['groups' => ['job_title']]);

        $location = $urlGenerator->generate('job_title_detail', ['id' => $jobTitle->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

        return new JsonResponse($jsonJobTitle, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    /**
     * @param Request $request
     * @param SerializerInterface $serializer
     * @param JobTitle $currentJobTitle
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    #[Route('/{id}', name: "job_title_update", methods: ['PUT'])]
    public function updateJobTitle(Request $request, SerializerInterface $serializer, JobTitle $currentJobTitle, EntityManagerInterface $em): JsonResponse
    {
        $updatedJobTitle = $serializer->deserialize($request->getContent(),
            JobTitle::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentJobTitle]);

        $em->persist($updatedJobTitle);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }


}
