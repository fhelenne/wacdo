<?php

namespace App\Controller;

use App\Entity\Restaurant;
use App\Repository\RestaurantRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/v1/restaurant')]
#[IsGranted('ROLE_ADMIN')]
final class RestaurantController extends AbstractController
{
    /**
     * @param RestaurantRepository $restaurantRepository
     * @param SerializerInterface $serializer
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    #[Route('/', name: 'restaurant_list', methods: ['GET'])]
    public function getRestaurants(RestaurantRepository $restaurantRepository, SerializerInterface $serializer): JsonResponse
    {
        $restaurantList = $restaurantRepository->findAll();
        $jsonRestaurantList = $serializer->serialize($restaurantList, 'json',['groups' => ['restaurant']]);
        return new JsonResponse($jsonRestaurantList, Response::HTTP_OK, [], true);
    }

    /**
     * @param Restaurant $restaurant
     * @param SerializerInterface $serializer
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    #[Route('/{id}', name: 'restaurant_detail', methods: ['GET'])]
    public function getRestaurantDetail(Restaurant $restaurant, SerializerInterface $serializer): JsonResponse
    {
        $jsonRestaurant = $serializer->serialize($restaurant, 'json',['groups' => ['restaurant']]);
        return new JsonResponse($jsonRestaurant, Response::HTTP_OK, [], true);
    }

    /**
     * @param Restaurant $restaurant
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    #[Route('/{id}', name: 'restaurant_delete', methods: ['DELETE'])]
    public function deleteRestaurant(Restaurant $restaurant, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($restaurant);
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
    #[Route('/', name: 'restaurant_create', methods: ['POST'])]
    public function createRestaurant(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse
    {

        $restaurant = $serializer->deserialize($request->getContent(), Restaurant::class, 'json',['groups' => ['restaurant']]);
        $em->persist($restaurant);
        $em->flush();

        $jsonRestaurant = $serializer->serialize($restaurant, 'json',['groups' => ['restaurant']]);

        $location = $urlGenerator->generate('restaurant_detail', ['id' => $restaurant->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

        return new JsonResponse($jsonRestaurant, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    /**
     * @param Request $request
     * @param SerializerInterface $serializer
     * @param Restaurant $currentRestaurant
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    #[Route('/{id}', name: "restaurant_update", methods: ['PUT'])]
    public function updateRestaurant(Request $request, SerializerInterface $serializer, Restaurant $currentRestaurant, EntityManagerInterface $em): JsonResponse
    {
        $updatedRestaurant = $serializer->deserialize($request->getContent(),
            Restaurant::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentRestaurant]);

        $em->persist($updatedRestaurant);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }


}
