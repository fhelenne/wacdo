<?php

namespace App\Controller;

use App\Entity\Assignment;
use App\Repository\AssignmentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
//#[Route('/api/assignment')]
final class AssignmentController extends AbstractController
{
//    /**
//     * @param AssignmentRepository $assignmentRepository
//     * @param SerializerInterface $serializer
//     * @return JsonResponse
//     */
//    #[Route('/', name: 'assignment_list',methods: ['GET'])]
//    public function getAssignments(AssignmentRepository $assignmentRepository, SerializerInterface $serializer): JsonResponse
//    {
//        $assignmentList = $assignmentRepository->findAll();
//        $jsonAssignmentList = $serializer->serialize($assignmentList, 'json');
//        return new JsonResponse($jsonAssignmentList, Response::HTTP_OK, [], true);
//    }
//
//    /**
//     * @param Assignment $assignment
//     * @param SerializerInterface $serializer
//     * @return JsonResponse
//     */
//    #[Route('/{id}', name: 'assignment_detail', methods: ['GET'])]
//    public function getAssignmentDetail(Assignment $assignment, SerializerInterface $serializer): JsonResponse {
//        $jsonAssignment = $serializer->serialize($assignment, 'json');
//        return new JsonResponse($jsonAssignment, Response::HTTP_OK, [], true);
//    }
//
//    /**
//     * @param Assignment $assignment
//     * @param EntityManagerInterface $em
//     * @return JsonResponse
//     */
//    #[Route('/{id}', name: 'assignment_delete', methods: ['DELETE'])]
//    public function deleteAssignment(Assignment $assignment, EntityManagerInterface $em): JsonResponse
//    {
//        $em->remove($assignment);
//        $em->flush();
//
//        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
//    }
//
//
//    /**
//     * @param Request $request
//     * @param SerializerInterface $serializer
//     * @param EntityManagerInterface $em
//     * @param UrlGeneratorInterface $urlGenerator
//     * @return JsonResponse
//     */
//    #[Route('/', name: "assignment_create", methods: ['POST'])]
//    public function createAssignment(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse
//    {
//
//        $assignment = $serializer->deserialize($request->getContent(), Assignment::class, 'json');
//        $em->persist($assignment);
//        $em->flush();
//
//        $jsonAssignment = $serializer->serialize($assignment, 'json');
//
//        $location = $urlGenerator->generate('assignment_detail', ['id' => $assignment->getId()], UrlGeneratorInterface::ABSOLUTE_URL);
//
//        return new JsonResponse($jsonAssignment, Response::HTTP_CREATED, ["Location" => $location], true);
//    }
//
//    /**
//     * @param Request $request
//     * @param SerializerInterface $serializer
//     * @param Assignment $currentAssignment
//     * @param EntityManagerInterface $em
//     * @return JsonResponse
//     */
//    #[Route('/{id}', name: "assignment_update", methods: ['PUT'])]
//    public function updateAssignment(Request $request, SerializerInterface $serializer, Assignment $currentAssignment, EntityManagerInterface $em): JsonResponse
//    {
//        $updatedAssignment = $serializer->deserialize($request->getContent(),
//            Assignment::class,
//            'json',
//            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentAssignment]);
//
//        $em->persist($updatedAssignment);
//        $em->flush();
//        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
//    }


}
